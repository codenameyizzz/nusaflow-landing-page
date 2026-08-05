import { dashboardMetrics } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatBlock } from "./stat-block";

export function ProductMockup() {
  return (
    <Card className="gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.6px] text-mid-gray">
            Workspace
          </p>
          <h3 className="mt-1 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
            Operations overview
          </h3>
        </div>
        <Badge variant="outline">Live</Badge>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {dashboardMetrics.finance.map(([label, value, progress]) => (
          <div key={label} className="rounded-[10px] bg-canvas p-4">
            <StatBlock label={label} value={value} progress={progress} />
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[10px] border border-hairline p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium">Invoice queue</p>
            <Button size="sm" variant="secondary">
              Filter
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            {[
              ["INV-2407-0031", "Dewi Lestari", "Rp2.450.000"],
              ["INV-2407-0032", "Rizky Pratama", "Rp1.860.000"],
              ["INV-2407-0033", "Sari Indah", "Rp950.000"],
            ].map(([code, name, amount]) => (
              <div key={code} className="grid gap-1 rounded-[10px] bg-surface-alt p-3 text-sm sm:grid-cols-[1fr_1fr_auto] sm:gap-3">
                <span className="min-w-0 font-medium">{code}</span>
                <span className="min-w-0 text-mid-gray">{name}</span>
                <span className="font-medium sm:font-normal">{amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[10px] border border-hairline p-4">
          <p className="font-medium">Automation checks</p>
          <div className="mt-4 space-y-3">
            {[
              ["Send invoice reminder", 88],
              ["Stock alert check", 61],
              ["Generate weekly report", 44],
            ].map(([label, value]) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span className="text-mid-gray">{value}%</span>
                </div>
                <Progress value={Number(value)} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
