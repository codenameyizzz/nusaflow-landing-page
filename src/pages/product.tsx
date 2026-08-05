import { features } from "@/data/site";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductMockup } from "@/components/marketing/product-mockup";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatBlock } from "@/components/marketing/stat-block";
import { PageFrame } from "@/layouts/page-frame";

export function ProductPage() {
  return (
    <PageFrame
      eyebrow="Product"
      title="A compact operating system for daily business work."
      copy="NusaFlow turns invoices, orders, customer messages, and approval decisions into one predictable workspace."
    >
      <section className="py-20">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <ProductMockup />
          <div className="grid gap-4">
            {features.slice(0, 4).map((feature) => (
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
      <section className="border-y border-hairline bg-surface-alt py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Modules"
            title="Everything is organized as reusable operational modules."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Card>
              <StatBlock label="Automation" value="12K" progress={84} />
            </Card>
            <Card>
              <StatBlock label="Invoices tracked" value="8.4K" progress={78} />
            </Card>
            <Card>
              <StatBlock label="Teams onboarded" value="420" progress={64} />
            </Card>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
