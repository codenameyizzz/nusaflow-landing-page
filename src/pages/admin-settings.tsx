import { Bell, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const settings = [
  {
    title: "Admin approval",
    copy: "Produk baru tetap draft sampai admin mengaktifkan publish.",
    icon: ShieldCheck,
    enabled: true,
  },
  {
    title: "Security alerts",
    copy: "Tampilkan sinyal aktivitas auth yang perlu direview admin.",
    icon: LockKeyhole,
    enabled: true,
  },
  {
    title: "Daily summary",
    copy: "Siapkan ringkasan operasional harian untuk dashboard admin.",
    icon: Bell,
    enabled: false,
  },
];

export function AdminSettingsPage() {
  return (
    <div className="grid gap-4">
      <Card>
        <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
          Settings
        </p>
        <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
          Admin workspace settings
        </h2>
        <p className="mt-2 text-sm text-mid-gray">
          Panel ini disiapkan untuk konfigurasi CMS NusaFlow berikutnya.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {settings.map(({ title, copy, icon: Icon, enabled }) => (
          <Card key={title}>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-9 items-center justify-center rounded-[18px] bg-canvas text-ink">
                  <Icon className="size-4" />
                </span>
                <Switch defaultChecked={enabled} />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{copy}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-medium text-ink">Environment</p>
            <p className="text-sm text-mid-gray">Development mode with local PostgreSQL and local uploads.</p>
          </div>
          <Badge variant="outline">Local</Badge>
        </div>
      </Card>
    </div>
  );
}
