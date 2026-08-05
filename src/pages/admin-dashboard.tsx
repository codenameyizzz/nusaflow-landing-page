import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Package, Settings, ShieldCheck, UserCog, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { adminApi, type AdminOverview } from "@/lib/auth-api";

const adminModules = [
  { label: "Products", href: "/admin/products", icon: Package, copy: "Kelola catalog produk dan gambar." },
  { label: "Users", href: "/admin/users", icon: Users, copy: "Lihat user dan role akses." },
  { label: "Activity", href: "/admin/activity", icon: Activity, copy: "Pantau perubahan user dan produk." },
  { label: "Settings", href: "/admin/settings", icon: Settings, copy: "Konfigurasi workspace admin." },
];

export function AdminDashboardPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    adminApi
      .overview()
      .then(setOverview)
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : "Gagal membaca admin overview.");
      });
  }, []);

  const stats = [
    { label: "Total users", value: overview?.stats.totalUsers ?? 0, icon: Users, progress: 86 },
    { label: "Admin users", value: overview?.stats.adminUsers ?? 0, icon: ShieldCheck, progress: 34 },
    { label: "Regular users", value: overview?.stats.regularUsers ?? 0, icon: UserCog, progress: 72 },
  ];

  return (
    <div className="grid gap-4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge>Overview</Badge>
            <h2 className="mt-4 max-w-3xl text-[30px] font-semibold leading-[1.2] tracking-[-0.75px] sm:text-[36px] sm:leading-[1.11] sm:tracking-[-0.9px]">
              Ringkasan CMS untuk mengelola operasi NusaFlow.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.5] text-mid-gray">
              Dashboard admin sekarang dipisah menjadi module products, users, activity, dan settings.
            </p>
          </div>
          <Badge variant="outline">Protected by role guard</Badge>
        </div>

        {errorMessage ? (
          <p className="mt-6 rounded-[18px] bg-paper px-4 py-3 text-sm text-ember shadow-subtle">{errorMessage}</p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, progress }) => (
            <Card key={label}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-9 items-center justify-center rounded-[18px] bg-canvas text-ink">
                    <Icon className="size-4" />
                  </span>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-[30px] leading-[1.2] tracking-[-0.75px]">{value}</CardTitle>
              </CardHeader>
              <Progress value={progress} />
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
                  Users
                </p>
                <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
                  User terbaru
                </h2>
              </div>
              <Badge variant="outline">{overview?.latestUsers.length ?? 0} shown</Badge>
            </div>
            <div className="overflow-hidden rounded-[18px] border border-hairline">
              {(overview?.latestUsers ?? []).map((user) => (
                <div
                  key={user.id}
                  className="grid gap-2 border-b border-hairline bg-paper px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <span className="font-medium text-ink">{user.name}</span>
                  <span className="truncate text-mid-gray">{user.email}</span>
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
                </div>
              ))}
              {overview && overview.latestUsers.length === 0 ? (
                <p className="px-4 py-3 text-sm text-mid-gray">Belum ada user.</p>
              ) : null}
              {!overview && !errorMessage ? (
                <p className="px-4 py-3 text-sm text-mid-gray">Loading users...</p>
              ) : null}
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
                Modules
              </p>
              <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
                Admin sections
              </h2>
            </div>
            {adminModules.map(({ label, href, icon: Icon, copy }) => (
              <div key={href} className="flex items-center justify-between gap-3 rounded-[18px] bg-canvas px-3 py-3 text-sm">
                <div className="flex min-w-0 items-center gap-3">
                  <Icon className="size-4 shrink-0 text-mid-gray" />
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{label}</p>
                    <p className="truncate text-mid-gray">{copy}</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to={href}>Open</Link>
                </Button>
              </div>
            ))}
          </Card>
        </div>
    </div>
  );
}
