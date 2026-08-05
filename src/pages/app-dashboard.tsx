import { useEffect, useState } from "react";
import { Activity, LayoutDashboard } from "lucide-react";
import { activityTimeline, operationalModules } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProductCard } from "@/components/product/product-card";
import { useAuth } from "@/contexts/auth-context";
import { productsApi, type Product } from "@/lib/auth-api";

export function AppDashboardPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi
      .published()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    <section className="border-b border-hairline pt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge>Workspace</Badge>
            <h1 className="mt-5 max-w-3xl text-[36px] font-semibold leading-[1.11] tracking-[-0.9px] sm:text-[48px] sm:leading-[1.1] sm:tracking-[-2.4px]">
              Selamat datang, {user?.name}.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.5] text-mid-gray">
              Ini adalah area user untuk membaca queue invoice, order, customer, dan catalog yang dipublish admin.
            </p>
          </div>
          <Card className="w-full md:max-w-xs">
            <CardHeader>
              <CardDescription>Role</CardDescription>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="size-5" />
                {user?.role}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {operationalModules.slice(0, 3).map(({ title, metric, icon: Icon, copy }, index) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-9 items-center justify-center rounded-[18px] bg-canvas text-ink">
                    <Icon className="size-4" />
                  </span>
                  <Badge variant="secondary">{metric}</Badge>
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{copy}</CardDescription>
              </CardHeader>
              <Progress value={[68, 42, 81][index]} />
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
                Activity stream
              </p>
              <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
                Workflow terakhir
              </h2>
            </div>
            <Badge variant="outline">User scope</Badge>
          </div>
          {activityTimeline.map((item) => (
            <div key={item.title} className="grid gap-3 rounded-[18px] bg-canvas px-3 py-3 text-sm sm:grid-cols-[64px_1fr]">
              <Badge variant="outline" className="justify-center">{item.time}</Badge>
              <div className="flex min-w-0 items-start gap-3">
              <Activity className="size-4 text-mid-gray" />
                <div className="min-w-0">
                  <p className="font-medium text-ink">{item.title}</p>
                  <p className="mt-1 text-mid-gray">{item.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>

        <div className="mt-4">
          <Card>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
                  Products
                </p>
                <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
                  Produk published dari CMS
                </h2>
              </div>
              <Badge variant="outline">{products.length} visible</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {products.length === 0 ? (
                <p className="rounded-[18px] bg-canvas px-3 py-2 text-sm text-mid-gray">
                  Belum ada produk published dari admin CMS.
                </p>
              ) : null}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
