import { useState } from "react";
import { Check } from "lucide-react";
import { plans } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PageFrame } from "@/layouts/page-frame";

export function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const activePrice = (plan: (typeof plans)[number]) => {
    if (plan.name === "Scale") return "Custom";
    return `Rp${annual ? plan.annual : plan.monthly}rb`;
  };

  return (
    <PageFrame
      eyebrow="Pricing"
      title="Simple plans for teams that want operational clarity."
      copy="Start with a compact workflow setup, then scale into approval, audit, and integration controls."
    >
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex w-full flex-wrap items-center gap-3 rounded-[24px] border border-hairline bg-paper p-3 shadow-subtle sm:w-fit">
            <span className={!annual ? "text-ink" : "text-mid-gray"}>Monthly</span>
            <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
            <span className={annual ? "text-ink" : "text-mid-gray"}>Annual</span>
            <Badge variant="secondary">Save 20%</Badge>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.featured ? "border-ink" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.featured ? <Badge>Popular</Badge> : null}
                  </div>
                  <div className="mt-4">
                    <span className="text-[30px] font-semibold leading-[1.2] tracking-[-0.75px] sm:text-[36px] sm:leading-[1.11] sm:tracking-[-0.9px]">
                      {activePrice(plan)}
                    </span>
                    {plan.name !== "Scale" ? <span className="text-mid-gray">/month</span> : null}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                    Select plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
