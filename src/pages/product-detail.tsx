import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ImageIcon, MessageSquareText, Workflow } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { productsApi, type Product } from "@/lib/auth-api";

const detailFeatures = [
  "Published from admin CMS",
  "Supports product gallery",
  "Ready for customer CTA",
];

export function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    setErrorMessage("");

    productsApi
      .detail(slug)
      .then((result) => {
        setProduct(result);
        setSelectedImageIndex(0);
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : "Produk tidak ditemukan.");
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  const selectedImage = useMemo(
    () => product?.images[selectedImageIndex] ?? product?.images[0],
    [product, selectedImageIndex],
  );

  return (
    <section className="border-b border-hairline pt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Button asChild variant="secondary">
          <Link to="/product">
            <ArrowLeft />
            Back to products
          </Link>
        </Button>

        {isLoading ? (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Loading product</CardTitle>
              <CardDescription>Membaca detail produk dari backend.</CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        {errorMessage ? (
          <Card className="mt-8">
            <CardHeader>
              <Badge variant="destructive">Not found</Badge>
              <CardTitle>Produk tidak tersedia</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        {product ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-3">
              <Card className="overflow-hidden p-3">
                <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-canvas">
                  {selectedImage ? (
                    <img src={selectedImage.url} alt={product.title} className="size-full object-cover" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-mid-gray">
                      <ImageIcon className="size-6" />
                    </div>
                  )}
                </div>
              </Card>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={[
                      "aspect-square overflow-hidden rounded-[18px] border bg-paper p-1",
                      selectedImageIndex === index ? "border-ink" : "border-hairline",
                    ].join(" ")}
                    aria-label={`Preview image ${index + 1}`}
                  >
                    <img src={image.url} alt={product.title} className="size-full rounded-[14px] object-cover" />
                  </button>
                ))}
                {!product.images.length ? (
                  <div className="aspect-square rounded-[18px] border border-hairline bg-paper p-1">
                    <div className="flex size-full items-center justify-center rounded-[14px] bg-canvas text-mid-gray">
                      <ImageIcon className="size-4" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid content-start gap-4">
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge variant="secondary">{product.category}</Badge>
                  <span className="text-sm font-medium text-ink">{product.priceLabel}</span>
                </div>
                <h1 className="text-[36px] font-semibold leading-[1.11] tracking-[-0.9px] sm:text-[48px] sm:leading-[1.1] sm:tracking-[-2.4px]">
                  {product.title}
                </h1>
                <p className="text-base leading-[1.5] text-mid-gray">{product.description}</p>
                <Separator />
                <div className="grid gap-3">
                  {detailFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-[18px] bg-canvas px-3 py-2 text-sm">
                      <CheckCircle2 className="size-4 text-ink" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild className="w-full sm:w-auto">
                    <Link to="/contact">
                      Contact sales
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link to="/app">
                      Open workspace
                      <Workflow />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <MessageSquareText className="size-5 text-ink" />
                  <CardTitle>Operational fit</CardTitle>
                  <CardDescription>
                    Produk ini bisa dipakai sebagai katalog layanan, modul workflow, atau item operasional
                    yang dikelola langsung dari CMS admin.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
