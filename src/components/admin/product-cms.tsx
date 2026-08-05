import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Edit3, ImagePlus, PackagePlus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { adminProductsApi, type Product, type ProductInput } from "@/lib/auth-api";

const emptyForm: ProductInput = {
  title: "",
  category: "",
  description: "",
  priceLabel: "",
  isPublished: true,
};

type ProductFormErrors = Partial<Record<keyof ProductInput | "images", string>>;

type DeleteTarget =
  | { type: "product"; product: Product }
  | { type: "image"; product: Product; imageId: string };

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const maxImageSize = 2 * 1024 * 1024;

export function ProductCms() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<ProductFormErrors>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionKey, setActionKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const publishedCount = useMemo(
    () => products.filter((product) => product.isPublished).length,
    [products],
  );
  const imagePreviews = useMemo(
    () =>
      imageFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [imageFiles],
  );

  useEffect(() => {
    void loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [imagePreviews]);

  async function loadProducts() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      setProducts(await adminProductsApi.list());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal membaca produk.");
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingProduct(null);
    setForm(emptyForm);
    setFieldErrors({});
    setImageFiles([]);
    setErrorMessage("");
    setIsDialogOpen(true);
  }

  function openEditDialog(product: Product) {
    setEditingProduct(product);
    setForm({
      title: product.title,
      category: product.category,
      description: product.description,
      priceLabel: product.priceLabel,
      isPublished: product.isPublished,
    });
    setFieldErrors({});
    setImageFiles([]);
    setErrorMessage("");
    setIsDialogOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateProductForm(form, imageFiles);

    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (editingProduct) {
        await adminProductsApi.update(editingProduct.id, form);
        if (imageFiles.length) {
          await adminProductsApi.addImages(editingProduct.id, imageFiles);
        }
      } else {
        await adminProductsApi.create(form, imageFiles);
      }

      setIsDialogOpen(false);
      setImageFiles([]);
      await loadProducts();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal menyimpan produk.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<Key extends keyof ProductInput>(key: Key, value: ProductInput[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleImageSelection(files: File[]) {
    setImageFiles(files);
    setFieldErrors((current) => ({ ...current, images: validateImages(files) }));
  }

  async function removeImage(product: Product, imageId: string) {
    setErrorMessage("");
    setActionKey(`image-${imageId}`);

    try {
      await adminProductsApi.removeImage(product.id, imageId);
      setEditingProduct((current) =>
        current?.id === product.id
          ? { ...current, images: current.images.filter((image) => image.id !== imageId) }
          : current,
      );
      await loadProducts();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal menghapus gambar.");
    } finally {
      setActionKey("");
      setDeleteTarget(null);
    }
  }

  async function togglePublish(product: Product) {
    setErrorMessage("");
    setActionKey(`publish-${product.id}`);

    try {
      await adminProductsApi.update(product.id, {
        isPublished: !product.isPublished,
      });
      await loadProducts();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengubah status produk.");
    } finally {
      setActionKey("");
    }
  }

  async function deleteProduct(product: Product) {
    setErrorMessage("");
    setActionKey(`delete-${product.id}`);

    try {
      await adminProductsApi.remove(product.id);
      await loadProducts();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal menghapus produk.");
    } finally {
      setActionKey("");
      setDeleteTarget(null);
    }
  }

  return (
    <Card>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
            Product CMS
          </p>
          <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
            Produk halaman product
          </h2>
          <p className="mt-2 text-sm text-mid-gray">
            Produk published akan tampil di halaman `/product`.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{products.length} total</Badge>
          <Badge variant="secondary">{publishedCount} published</Badge>
          <Button onClick={openCreateDialog}>
            <PackagePlus />
            Add product
          </Button>
        </div>
      </div>

      {errorMessage ? (
        <p className="rounded-[18px] bg-canvas px-3 py-2 text-sm text-ember">{errorMessage}</p>
      ) : null}

      <div className="overflow-hidden rounded-[18px] border border-hairline">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid gap-4 border-b border-hairline bg-paper px-4 py-4 text-sm last:border-b-0 lg:grid-cols-[96px_minmax(0,1fr)_minmax(160px,0.45fr)_auto] lg:items-center"
          >
            <div className="h-20 w-24 overflow-hidden rounded-[18px] bg-canvas">
              {product.images[0] ? (
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className="size-full object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-mid-gray">
                  <ImagePlus className="size-5" />
                </span>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <p className="min-w-0 truncate font-medium text-ink">{product.title}</p>
                <Badge variant={product.isPublished ? "default" : "secondary"}>
                  {product.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-2 text-mid-gray">{product.description}</p>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2 text-mid-gray lg:justify-end">
              <Badge variant="outline" className="max-w-full truncate">
                {product.category}
              </Badge>
              <Badge variant="outline">{product.images.length} images</Badge>
              <span className="shrink-0 text-sm font-medium text-ink">{product.priceLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2 lg:w-[272px] lg:justify-end">
              <Button
                variant="secondary"
                onClick={() => togglePublish(product)}
                disabled={actionKey === `publish-${product.id}`}
              >
                {actionKey === `publish-${product.id}`
                  ? "Updating..."
                  : product.isPublished
                    ? "Unpublish"
                    : "Publish"}
              </Button>
              <Button variant="outline" onClick={() => openEditDialog(product)}>
                <Edit3 />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDeleteTarget({ type: "product", product })}
                disabled={actionKey === `delete-${product.id}`}
              >
                <Trash2 />
                {actionKey === `delete-${product.id}` ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ))}
        {isLoading ? <p className="px-4 py-4 text-sm text-mid-gray">Loading products...</p> : null}
        {!isLoading && products.length === 0 ? (
          <p className="px-4 py-4 text-sm text-mid-gray">Belum ada produk. Buat produk pertama dari CMS.</p>
        ) : null}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-hidden p-0 sm:max-w-2xl">
          <form onSubmit={handleSubmit} className="flex max-h-[calc(100vh-2rem)] flex-col">
            <DialogHeader className="border-b border-hairline p-5 pb-4">
              <DialogTitle>{editingProduct ? "Edit product" : "Create product"}</DialogTitle>
              <DialogDescription>
                Konten ini akan muncul di halaman product saat statusnya published.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 overflow-y-auto p-5">
              <div className="space-y-2">
                <Label htmlFor="product-title">Title</Label>
                <Input
                  id="product-title"
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.title)}
                  minLength={3}
                  maxLength={80}
                  required
                />
                {fieldErrors.title ? <FieldError>{fieldErrors.title}</FieldError> : null}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Input
                    id="product-category"
                    value={form.category}
                    onChange={(event) => updateField("category", event.target.value)}
                    aria-invalid={Boolean(fieldErrors.category)}
                    minLength={2}
                    maxLength={40}
                    required
                  />
                  {fieldErrors.category ? <FieldError>{fieldErrors.category}</FieldError> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price label</Label>
                  <Input
                    id="product-price"
                    value={form.priceLabel}
                    onChange={(event) => updateField("priceLabel", event.target.value)}
                    aria-invalid={Boolean(fieldErrors.priceLabel)}
                    minLength={2}
                    maxLength={40}
                    required
                  />
                  {fieldErrors.priceLabel ? <FieldError>{fieldErrors.priceLabel}</FieldError> : null}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <textarea
                  id="product-description"
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.description)}
                  className="min-h-28 w-full resize-none rounded-[18px] border border-transparent bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-mid-gray focus-visible:border-hairline focus-visible:bg-transparent"
                  minLength={12}
                  maxLength={240}
                  required
                />
                <div className="flex items-center justify-between gap-3 text-xs">
                  {fieldErrors.description ? (
                    <FieldError>{fieldErrors.description}</FieldError>
                  ) : (
                    <span className="text-mid-gray">Minimal 12 karakter.</span>
                  )}
                  <span className="text-mid-gray">{form.description.length}/240</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-images">Images</Label>
                <Input
                  id="product-images"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  multiple
                  onChange={(event) => handleImageSelection(Array.from(event.target.files ?? []))}
                />
                <p className="text-xs text-mid-gray">
                  Maksimal 6 file per upload. Format: jpg, png, webp, atau gif.
                </p>
                {fieldErrors.images ? <FieldError>{fieldErrors.images}</FieldError> : null}
                {imagePreviews.length ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {imagePreviews.map(({ file, url }) => (
                      <div key={`${file.name}-${file.size}`} className="overflow-hidden rounded-[18px] border border-hairline bg-canvas">
                        <img src={url} alt={file.name} className="aspect-[4/3] w-full object-cover" />
                        <div className="p-2">
                          <p className="truncate text-xs font-medium text-ink">{file.name}</p>
                          <p className="text-xs text-mid-gray">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              {editingProduct?.images.length ? (
                <div className="space-y-2">
                  <Label>Existing images</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {editingProduct.images.map((image) => (
                      <div key={image.id} className="overflow-hidden rounded-[18px] border border-hairline bg-canvas">
                        <img
                          src={image.url}
                          alt={editingProduct.title}
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          className="m-2 w-[calc(100%-1rem)]"
                          onClick={() =>
                            setDeleteTarget({
                              type: "image",
                              product: editingProduct,
                              imageId: image.id,
                            })
                          }
                          disabled={actionKey === `image-${image.id}`}
                        >
                          <Trash2 />
                          {actionKey === `image-${image.id}` ? "Removing..." : "Remove"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <Label className="flex items-center justify-between gap-4 rounded-[18px] bg-canvas px-3 py-2">
                <span>
                  <span className="block text-sm text-ink">Published</span>
                  <span className="block text-xs text-mid-gray">Tampilkan ke halaman product.</span>
                </span>
                <Switch
                  checked={form.isPublished}
                  onCheckedChange={(checked) => updateField("isPublished", checked)}
                />
              </Label>
            </div>

            <DialogFooter className="border-t border-hairline bg-paper p-5 pt-4">
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {deleteTarget?.type === "image" ? "Remove product image?" : "Delete product?"}
            </DialogTitle>
            <DialogDescription>
              {deleteTarget?.type === "image"
                ? "Gambar akan dihapus dari produk dan tidak tampil lagi di halaman user."
                : `Produk "${deleteTarget?.product.title ?? ""}" akan dihapus dari CMS dan halaman user.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={Boolean(actionKey)}
              onClick={() => {
                if (!deleteTarget) return;
                if (deleteTarget.type === "image") {
                  void removeImage(deleteTarget.product, deleteTarget.imageId);
                  return;
                }
                void deleteProduct(deleteTarget.product);
              }}
            >
              <Trash2 />
              {actionKey ? "Deleting..." : deleteTarget?.type === "image" ? "Remove image" : "Delete product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function validateProductForm(form: ProductInput, files: File[]): ProductFormErrors {
  const errors: ProductFormErrors = {};
  const title = form.title.trim();
  const category = form.category.trim();
  const description = form.description.trim();
  const priceLabel = form.priceLabel.trim();

  if (title.length < 3) errors.title = "Title minimal 3 karakter.";
  if (title.length > 80) errors.title = "Title maksimal 80 karakter.";
  if (category.length < 2) errors.category = "Category minimal 2 karakter.";
  if (category.length > 40) errors.category = "Category maksimal 40 karakter.";
  if (description.length < 12) errors.description = "Description minimal 12 karakter.";
  if (description.length > 240) errors.description = "Description maksimal 240 karakter.";
  if (priceLabel.length < 2) errors.priceLabel = "Price label minimal 2 karakter.";
  if (priceLabel.length > 40) errors.priceLabel = "Price label maksimal 40 karakter.";

  const imageError = validateImages(files);
  if (imageError) errors.images = imageError;

  return errors;
}

function validateImages(files: File[]) {
  if (files.length > 6) return "Maksimal 6 gambar per upload.";

  const invalidType = files.find((file) => !allowedImageTypes.includes(file.type));
  if (invalidType) return `${invalidType.name} bukan format gambar yang didukung.`;

  const invalidSize = files.find((file) => file.size > maxImageSize);
  if (invalidSize) return `${invalidSize.name} lebih besar dari 2MB.`;

  return undefined;
}

function FieldError({ children }: { children: string }) {
  return <p className="text-xs leading-[1.33] text-ember">{children}</p>;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
