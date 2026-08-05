import { useEffect, useState } from "react";
import { features } from "@/data/site";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductMockup } from "@/components/marketing/product-mockup";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatBlock } from "@/components/marketing/stat-block";
import { PageFrame } from "@/layouts/page-frame";
import { Badge } from "@/components/ui/badge";
import { productsApi, type Product } from "@/lib/auth-api";

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    productsApi
      .published()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setIsLoadingProducts(false));
  }, []);

  return (
    <PageFrame
      eyebrow="Product"
      title="A compact operating system for daily business work."
      copy="NusaFlow turns invoices, orders, customer messages, and approval decisions into one predictable workspace."
    >
      <section className="py-20">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <ProductMockup />
          <div className="grid gap-4">
            {features.slice(0, 4).map((feature) => (
              <Card key={feature.title}>
                <CardHeader className="p-5">
                  <feature.icon className="size-5 text-ink" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.copy}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-hairline bg-surface-alt py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Modules"
            title="Everything is organized as reusable operational modules."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Card>
              <StatBlock label="Automation" value="12K" progress={84} />
            </Card>
            <Card>
              <StatBlock label="Invoices tracked" value="8.4K" progress={78} />
            </Card>
            <Card>
              <StatBlock label="Teams onboarded" value="420" progress={64} />
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CMS Products"
            title="Published products from the admin CMS."
            copy="Produk di section ini berasal dari database. Admin bisa membuat, mengubah, publish, atau menghapusnya dari CMS."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden p-0">
                <div className="aspect-[4/3] bg-canvas">
                  {product.images[0] ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-sm text-mid-gray">
                      No image
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <span className="text-sm font-medium text-ink">{product.priceLabel}</span>
                  </div>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
            {isLoadingProducts ? (
              <Card>
                <CardHeader>
                  <CardTitle>Loading products</CardTitle>
                  <CardDescription>Membaca data produk dari backend.</CardDescription>
                </CardHeader>
              </Card>
            ) : null}
            {!isLoadingProducts && products.length === 0 ? (
              <Card>
                <CardHeader>
                  <Badge variant="outline">Empty state</Badge>
                  <CardTitle>Belum ada produk published</CardTitle>
                  <CardDescription>
                    Login sebagai admin, buka `/admin`, lalu buat produk dan aktifkan status published.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : null}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
