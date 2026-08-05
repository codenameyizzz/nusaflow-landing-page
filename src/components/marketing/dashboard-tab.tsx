import type { Metric } from "@/data/site";
import { Card } from "@/components/ui/card";
import { StatBlock } from "./stat-block";

export function DashboardTab({ items }: { items: Metric[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map(([label, value, progress]) => (
        <Card key={label}>
          <StatBlock label={label} value={value} progress={progress} />
        </Card>
      ))}
    </div>
  );
}
