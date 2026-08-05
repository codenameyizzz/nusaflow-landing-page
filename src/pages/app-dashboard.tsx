import { Activity, CheckCircle2, Clock3, Inbox, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";

const userTasks = [
  { label: "Review customer inbox", value: "9 open", icon: Inbox },
  { label: "Approve pending workflow", value: "3 items", icon: CheckCircle2 },
  { label: "Sync daily report", value: "14:00", icon: Clock3 },
];

export function AppDashboardPage() {
  const { user } = useAuth();

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
      </div>
    </section>
  );
}
