import { useEffect, useState } from "react";
import { features, operationalModules, workflowTemplates } from "@/data/site";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductMockup } from "@/components/marketing/product-mockup";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProductCard } from "@/components/product/product-card";
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
      title="A workflow OS for invoices, orders, customers, and service catalog."
      copy="NusaFlow gives operational teams a structured place to run daily work, while admins manage products and services from CMS."
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
            eyebrow="Core modules"
            title="Each module owns a real business queue."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {operationalModules.slice(0, 3).map((module) => (
              <Card key={module.title}>
                <CardHeader>
                  <module.icon className="size-5 text-ink" />
                  <Badge variant="secondary" className="w-fit">{module.metric}</Badge>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.copy}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Workflow templates"
            title="Templates convert recurring work into clear operational flows."
            copy="Finance, fulfillment, and support can start from predefined routines instead of building from scratch."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {workflowTemplates.map((template) => (
              <Card key={template.title}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <template.icon className="size-5 text-ink" />
                    <Badge variant="outline">{template.meta}</Badge>
                  </div>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.copy}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CMS Products"
            title="Product and service catalog from the admin CMS."
            copy="Setiap card di bawah berasal dari database. Admin bisa membuat produk, upload gambar, publish, dan mengarahkan user ke detail page."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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
