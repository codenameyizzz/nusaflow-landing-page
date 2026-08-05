import { useEffect, useState } from "react";
import { Activity, Package, ShieldCheck, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { adminApi, adminProductsApi, type Product, type PublicUser } from "@/lib/auth-api";

export function AdminActivityPage() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    void Promise.all([
      adminApi.users().then(setUsers).catch(() => setUsers([])),
      adminProductsApi.list().then(setProducts).catch(() => setProducts([])),
    ]);
  }, []);

  const events = [
    ...users.slice(0, 4).map((user) => ({
      id: `user-${user.id}`,
      title: `${user.name} registered`,
      copy: user.email,
      label: user.role,
      icon: user.role === "ADMIN" ? ShieldCheck : UserPlus,
      date: user.createdAt,
    })),
    ...products.slice(0, 4).map((product) => ({
      id: `product-${product.id}`,
      title: `${product.title} updated`,
      copy: product.description,
      label: product.isPublished ? "Published" : "Draft",
      icon: Package,
      date: product.updatedAt,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="grid gap-4">
      <Card>
        <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
          Activity
        </p>
        <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
          Admin activity timeline
        </h2>
        <p className="mt-2 text-sm text-mid-gray">
          Ringkasan aktivitas user dan produk dari database.
        </p>
      </Card>

      <Card>
        <div className="grid gap-3">
          {events.map(({ id, title, copy, label, icon: Icon, date }) => (
            <div key={id} className="grid gap-3 rounded-[18px] bg-canvas p-4 md:grid-cols-[40px_1fr_auto] md:items-center">
              <span className="flex size-10 items-center justify-center rounded-[18px] bg-paper text-ink shadow-subtle">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{title}</p>
                <p className="line-clamp-1 text-sm text-mid-gray">{copy}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <Badge variant="outline">{label}</Badge>
                <span className="text-xs text-mid-gray">{new Date(date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {!events.length ? (
            <div className="flex items-center gap-3 rounded-[18px] bg-canvas p-4 text-sm text-mid-gray">
              <Activity className="size-4" />
              Belum ada aktivitas.
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
