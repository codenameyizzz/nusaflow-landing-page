import { useEffect, useState } from "react";
import { Activity, CheckCircle2, Clock3, Inbox, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";
import { productsApi, type Product } from "@/lib/auth-api";

const userTasks = [
  { label: "Review customer inbox", value: "9 open", icon: Inbox },
  { label: "Approve pending workflow", value: "3 items", icon: CheckCircle2 },
  { label: "Sync daily report", value: "14:00", icon: Clock3 },
];

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
              Ini adalah area user untuk membaca pekerjaan operasional tanpa akses CMS admin.
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
          {userTasks.map(({ label, value, icon: Icon }, index) => (
            <Card key={label}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-9 items-center justify-center rounded-[18px] bg-canvas text-ink">
                    <Icon className="size-4" />
                  </span>
                  <Badge variant="secondary">{value}</Badge>
                </div>
                <CardTitle>{label}</CardTitle>
                <CardDescription>Prioritas kerja harian untuk user biasa.</CardDescription>
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
          {["Invoice reminder queued", "Customer follow-up completed", "Inventory alert reviewed"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-[18px] bg-canvas px-3 py-2 text-sm">
              <Activity className="size-4 text-mid-gray" />
              <span>{item}</span>
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
                <div key={product.id} className="overflow-hidden rounded-[18px] bg-canvas">
                  <div className="aspect-[4/3] bg-hairline/40">
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
                  <div className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <span className="text-sm font-medium text-ink">{product.priceLabel}</span>
                  </div>
                  <h3 className="mt-3 text-[18px] font-semibold leading-[1.56]">{product.title}</h3>
                  <p className="mt-1 text-sm leading-[1.43] text-mid-gray">{product.description}</p>
                  </div>
                </div>
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
