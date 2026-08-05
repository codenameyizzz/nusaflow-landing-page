import { ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageFrame } from "@/layouts/page-frame";

export function ContactPage() {
  return (
    <PageFrame
      eyebrow="Contact"
      title="Talk through your workflow before changing tools."
      copy="Use this page as a professional contact surface: short form, clear expectations, and no noisy copy."
    >
      <section className="py-20">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
              <CardDescription>Response within one business day.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-[10px] bg-canvas p-4">
                <p className="font-medium">Email</p>
                <p className="text-mid-gray">hello@nusaflow.example</p>
              </div>
              <div className="rounded-[10px] bg-canvas p-4">
                <p className="font-medium">Office</p>
                <p className="text-mid-gray">Jakarta, Indonesia</p>
              </div>
              <Button variant="destructive">
                <Trash2 />
                Revoke demo access
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Request consultation</CardTitle>
              <CardDescription>Tell us what process you want to clean up.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" placeholder="Ayu Lestari" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="ayu@company.co" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-workflow">Workflow</Label>
                <Input id="contact-workflow" placeholder="Invoice follow-up, order tracking, approval" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Submit request
                <ArrowRight />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </PageFrame>
  );
}
