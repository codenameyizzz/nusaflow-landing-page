import { testimonials } from "@/data/site";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PageFrame } from "@/layouts/page-frame";

export function CustomersPage() {
  return (
    <PageFrame
      eyebrow="Customers"
      title="Built for finance, sales, warehouse, and operators."
      copy="Each team sees the same source of truth, with just enough interface to make the next action clear."
    >
      <section className="py-20">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
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
      </section>
      <section className="border-y border-hairline bg-surface-alt py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Use cases" title="Operational patterns we support." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              ["Invoice collection", "Finance teams monitor due dates and follow-up queues."],
              ["Order fulfillment", "Warehouse teams track shipping readiness and returns."],
              ["Customer response", "Sales and support keep one customer timeline."],
              ["Approval audit", "Managers review discounts, refunds, and access changes."],
            ].map(([title, copy]) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{copy}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
