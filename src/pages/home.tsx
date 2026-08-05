import { Link } from "react-router-dom";
import { Check, ClipboardCheck } from "lucide-react";
import {
  dashboardMetrics,
  faqs,
  features,
  pains,
  plans,
  testimonials,
  workflowSteps,
} from "@/data/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "@/components/marketing/dashboard-tab";
import { DemoDialog } from "@/components/marketing/demo-dialog";
import { ProductMockup } from "@/components/marketing/product-mockup";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatBlock } from "@/components/marketing/stat-block";
import { useMemo, useState } from "react";

export function HomePage() {
  const [annual, setAnnual] = useState(true);
  const activePrice = useMemo(
    () => (plan: (typeof plans)[number]) => {
      if (plan.name === "Scale") return "Custom";
      return `Rp${annual ? plan.annual : plan.monthly}rb`;
    },
    [annual],
  );

  return (
    <>
      <section id="hero" className="border-b border-hairline pt-16">
        <div className="mx-auto grid min-h-[calc(92svh-4rem)] max-w-[1280px] items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 lg:px-8">
          <div>
            <Badge className="mb-5">clinical blueprint</Badge>
            <h1 className="max-w-2xl text-[36px] font-semibold leading-[1.11] tracking-[-0.9px] sm:text-[48px] sm:leading-[1.1] sm:tracking-[-2.4px]">
              Operations infrastructure on frosted paper.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.5] text-mid-gray">
              NusaFlow adalah contoh landing page shadcn/ui dengan sistem monochrome, radius besar,
              hairline borders, dan product mockup yang dibangun dari komponen.
            </p>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <DemoDialog />
              <Button asChild variant="secondary">
                <a href="#komponen">Inspect components</a>
              </Button>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              <StatBlock label="Time saved" value="38%" progress={72} />
              <StatBlock label="Rating" value="4.8" progress={96} />
              <StatBlock label="Workflows" value="12K" progress={84} />
            </div>
          </div>
          <ProductMockup />
        </div>
      </section>

      <section id="solusi" className="py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Problem"
            title="Manual work creates noise. The UI should not."
            copy="Card surfaces, compact type, and functional icons make the value proposition visible without decorative color."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pains.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <item.icon className="size-5 text-ink" />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.copy}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="komponen" className="border-y border-hairline bg-surface-alt py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Components"
              title="A living style guide built from shadcn primitives."
              copy="Tabs, Progress, Cards, Buttons, Badges, Inputs, and Dropdowns are styled through the same monochrome token layer."
            />
            <Tabs defaultValue="ops" className="overflow-hidden rounded-[24px] border border-hairline bg-paper p-4 shadow-subtle sm:p-5">
              <TabsList className="mb-4 max-w-full overflow-x-auto">
                <TabsTrigger value="ops">Operations</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
              </TabsList>
              <TabsContent value="ops">
                <DashboardTab items={dashboardMetrics.ops} />
              </TabsContent>
              <TabsContent value="finance">
                <DashboardTab items={dashboardMetrics.finance} />
              </TabsContent>
              <TabsContent value="customers">
                <DashboardTab items={dashboardMetrics.customers} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title="Every feature is presented as a tokenized UI object."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="size-5 text-ink" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.copy}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-y border-hairline bg-surface-alt py-20">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionHeading
            eyebrow="Workflow"
            title="Compact steps, large-radius containers, no chromatic decoration."
            copy="The hierarchy comes from spacing, type, and hairline borders."
          />
          <div className="space-y-3">
            {workflowSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-[24px] border border-hairline bg-paper p-5 shadow-subtle">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[18px] bg-ink text-sm font-medium text-surface-alt">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{step}</h3>
                  <p className="mt-2 text-sm leading-[1.43] text-mid-gray">
                    Structured as a compact operational checklist with quiet elevation.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <SectionHeading
              eyebrow="Social proof"
              title="Testimonials stay monochrome and compact."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <Card key={item.name}>
                  <CardContent>
                    <p className="text-sm leading-[1.63]">"{item.quote}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-canvas text-ink">{item.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-mid-gray">{item.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="harga" className="border-y border-hairline bg-surface-alt py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Pricing" title="Pricing with a monochrome switch." />
            <div className="flex w-full flex-wrap items-center gap-3 rounded-[24px] border border-hairline bg-paper p-3 shadow-subtle sm:w-fit">
              <span className={!annual ? "text-ink" : "text-mid-gray"}>Monthly</span>
              <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
              <span className={annual ? "text-ink" : "text-mid-gray"}>Annual</span>
              <Badge variant="secondary">Save 20%</Badge>
            </div>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
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

      <section id="faq" className="py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Accordion content remains purely typographic."
          />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="leading-[1.63] text-mid-gray">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-[24px] border border-hairline bg-paper p-5 text-center shadow-subtle sm:p-12">
          <ClipboardCheck className="mx-auto mb-5 size-8 text-ink" />
          <h2 className="text-[30px] font-semibold leading-[1.2] tracking-[-0.75px] sm:text-[36px] sm:leading-[1.11] sm:tracking-[-0.9px]">
            Ready to inspect the workflow?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mid-gray">
            The final CTA uses the same pill buttons, large radius card, and monochrome surface
            stack.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
            <DemoDialog />
            <Button asChild variant="secondary">
              <Link to="/register">Create account</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
