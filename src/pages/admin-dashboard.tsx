import { useEffect, useState } from "react";
import { Activity, ShieldCheck, UserCog, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { adminApi, type AdminOverview } from "@/lib/auth-api";

const cmsActions = ["User management", "Content sections", "Billing rules", "Audit activity"];

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
    <section className="border-b border-hairline pt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge>Admin CMS</Badge>
            <h1 className="mt-5 max-w-3xl text-[36px] font-semibold leading-[1.11] tracking-[-0.9px] sm:text-[48px] sm:leading-[1.1] sm:tracking-[-2.4px]">
              Control panel untuk mengelola user dan operasi.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.5] text-mid-gray">
              Area ini hanya bisa dibuka oleh akun dengan role admin.
            </p>
          </div>
          <Badge variant="outline">Protected by role guard</Badge>
        </div>

        {errorMessage ? (
          <p className="mt-6 rounded-[18px] bg-paper px-4 py-3 text-sm text-ember shadow-subtle">{errorMessage}</p>
        ) : null}

        <div className="mt-10 grid gap-4 md:grid-cols-3">
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

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
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
                CMS
              </p>
              <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
                Modul admin
              </h2>
            </div>
            {cmsActions.map((action) => (
              <div key={action} className="flex items-center gap-3 rounded-[18px] bg-canvas px-3 py-2 text-sm">
                <Activity className="size-4 text-mid-gray" />
                <span>{action}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
}
