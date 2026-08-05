import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Edit3, PackagePlus, Trash2 } from "lucide-react";
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

export function ProductCms() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const publishedCount = useMemo(
    () => products.filter((product) => product.isPublished).length,
    [products],
  );

  useEffect(() => {
    void loadProducts();
  }, []);

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
    setIsDialogOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (editingProduct) {
        await adminProductsApi.update(editingProduct.id, form);
      } else {
        await adminProductsApi.create(form);
      }

      setIsDialogOpen(false);
      await loadProducts();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal menyimpan produk.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function togglePublish(product: Product) {
    setErrorMessage("");

    try {
      await adminProductsApi.update(product.id, {
        isPublished: !product.isPublished,
      });
      await loadProducts();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengubah status produk.");
    }
  }

  async function deleteProduct(product: Product) {
    const confirmed = window.confirm(`Hapus produk "${product.title}"?`);

    if (!confirmed) return;

    setErrorMessage("");

    try {
      await adminProductsApi.remove(product.id);
      await loadProducts();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal menghapus produk.");
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
            className="grid gap-3 border-b border-hairline bg-paper px-4 py-4 text-sm last:border-b-0 lg:grid-cols-[1fr_0.7fr_auto]"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-ink">{product.title}</p>
                <Badge variant={product.isPublished ? "default" : "secondary"}>
                  {product.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-2 text-mid-gray">{product.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-mid-gray lg:justify-end">
              <Badge variant="outline">{product.category}</Badge>
              <span>{product.priceLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button variant="secondary" onClick={() => togglePublish(product)}>
                {product.isPublished ? "Unpublish" : "Publish"}
              </Button>
              <Button variant="outline" onClick={() => openEditDialog(product)}>
                <Edit3 />
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteProduct(product)}>
                <Trash2 />
                Delete
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
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit product" : "Create product"}</DialogTitle>
              <DialogDescription>
                Konten ini akan muncul di halaman product saat statusnya published.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-title">Title</Label>
                <Input
                  id="product-title"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  minLength={3}
                  maxLength={80}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Input
                    id="product-category"
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                    minLength={2}
                    maxLength={40}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price label</Label>
                  <Input
                    id="product-price"
                    value={form.priceLabel}
                    onChange={(event) => setForm((current) => ({ ...current, priceLabel: event.target.value }))}
                    minLength={2}
                    maxLength={40}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <textarea
                  id="product-description"
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="min-h-28 w-full resize-none rounded-[18px] border border-transparent bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-mid-gray focus-visible:border-hairline focus-visible:bg-transparent"
                  minLength={12}
                  maxLength={240}
                  required
                />
              </div>
              <Label className="flex items-center justify-between gap-4 rounded-[18px] bg-canvas px-3 py-2">
                <span>
                  <span className="block text-sm text-ink">Published</span>
                  <span className="block text-xs text-mid-gray">Tampilkan ke halaman product.</span>
                </span>
                <Switch
                  checked={form.isPublished}
                  onCheckedChange={(checked) => setForm((current) => ({ ...current, isPublished: checked }))}
                />
              </Label>
            </div>

            <DialogFooter className="mt-5">
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
    </Card>
  );
}
