import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Eye,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  MessageSquareText,
  PackageCheck,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  Workflow,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Route = "landing" | "product" | "pricing" | "customers" | "contact" | "login" | "register";
type Metric = [label: string, value: string, progress: number];

const navItems = [
  ["Product", "/product"],
  ["Pricing", "/pricing"],
  ["Customers", "/customers"],
  ["Contact", "/contact"],
];

const pains = [
  {
    icon: Clock3,
    title: "Pekerjaan sulit diprioritaskan",
    copy: "Lead, invoice, dan stok muncul dari banyak tempat sehingga tim sulit melihat urutan kerja.",
  },
  {
    icon: FileText,
    title: "Laporan terlalu berat",
    copy: "Owner harus membuka spreadsheet, chat, dan rekening hanya untuk membaca kondisi harian.",
  },
  {
    icon: Users,
    title: "Approval tidak tercatat",
    copy: "Diskon, retur, dan pembayaran sering disetujui manual tanpa jejak keputusan yang jelas.",
  },
];

const features = [
  {
    icon: Workflow,
    title: "Workflow builder",
    copy: "Susun automation untuk invoice, follow-up, status order, dan approval tanpa layar yang ramai.",
  },
  {
    icon: LayoutDashboard,
    title: "Operating dashboard",
    copy: "Panel metrik padat dengan hierarki visual berbasis type scale, bukan warna dekoratif.",
  },
  {
    icon: MessageSquareText,
    title: "Customer inbox",
    copy: "Riwayat pelanggan, catatan tim, dan reminder tetap berada dalam satu permukaan kerja.",
  },
  {
    icon: PackageCheck,
    title: "Inventory checks",
    copy: "Stok, pengiriman, dan retur bisa dilihat sebagai daftar operasional ringkas.",
  },
  {
    icon: CreditCard,
    title: "Invoice control",
    copy: "Jatuh tempo, pembayaran masuk, dan cash-in dibaca sebagai stat block yang tenang.",
  },
  {
    icon: ShieldCheck,
    title: "Audit trail",
    copy: "Aksi penting tersimpan sebagai event kecil dengan destructive red hanya untuk revoke/delete.",
  },
];

const dashboardMetrics: Record<"ops" | "finance" | "customers", Metric[]> = {
  ops: [
    ["Ready to ship", "142", 82],
    ["Warehouse SLA", "96%", 96],
    ["Open returns", "18", 32],
  ],
  finance: [
    ["Collected", "Rp84.6jt", 78],
    ["Due this week", "Rp12.4jt", 41],
    ["Cash-in", "+24%", 68],
  ],
  customers: [
    ["Open messages", "9", 28],
    ["Qualified leads", "64", 74],
    ["Resolution", "4.8/5", 92],
  ],
};

const workflowSteps = [
  "Connect order, invoice, inventory, and customer records.",
  "Choose a workflow template or define compact business rules.",
  "Review the dashboard and remove manual steps every week.",
];

const testimonials = [
  {
    quote:
      "Tampilan yang ringkas membuat finance langsung tahu invoice mana yang harus ditagih dulu.",
    name: "Ayu Lestari",
    role: "Finance Lead, SembakoHub",
    initials: "AL",
  },
  {
    quote:
      "Kami tidak perlu menandai chat satu per satu. Semua bottleneck muncul sebagai daftar kerja.",
    name: "Rizky Pratama",
    role: "COO, GudangRapi",
    initials: "RP",
  },
  {
    quote:
      "Desainnya terasa seperti tool developer: tidak ramai, tapi detail operasionalnya lengkap.",
    name: "Dewi Sari",
    role: "Head of Sales, OrderCepat",
    initials: "DS",
  },
];

const plans = [
  {
    name: "Starter",
    monthly: 299,
    annual: 239,
    description: "Untuk tim kecil yang mulai merapikan pekerjaan berulang.",
    items: ["3 workflow aktif", "Dashboard dasar", "Inbox pelanggan", "Support email"],
  },
  {
    name: "Growth",
    monthly: 799,
    annual: 639,
    description: "Untuk operasi yang butuh automation dan audit lebih lengkap.",
    items: ["Workflow tanpa batas", "Cashflow reminder", "Role approval", "Integrasi marketplace"],
    featured: true,
  },
  {
    name: "Scale",
    monthly: 0,
    annual: 0,
    description: "Untuk multi-cabang, akses granular, dan kebutuhan integrasi API.",
    items: ["SLA khusus", "Audit lanjutan", "Dedicated onboarding", "Integrasi API"],
  },
];

const faqs = [
  {
    q: "Apakah shadcn sudah ter-install?",
    a: "Ya. Package CLI shadcn terpasang sebagai dev dependency, components.json terbaca, dan npm run ui -- info mendeteksi komponen yang digunakan.",
  },
  {
    q: "Apakah halaman ini masih memakai komponen shadcn?",
    a: "Ya. Button, Card, Badge, Dialog, Sheet, Dropdown Menu, Tabs, Input, Checkbox, Switch, Progress, Accordion, Avatar, dan Separator tetap dipakai dari src/components/ui.",
  },
  {
    q: "Kenapa tidak ada hero photography?",
    a: "Karena design.md meminta minimal imagery. Visual utama sekarang berupa product mockup yang dibangun dari komponen UI.",
  },
  {
    q: "Kenapa hampir tidak ada warna?",
    a: "Style reference meminta achromatic-first. Satu-satunya hue adalah ember #e7000b dan hanya muncul untuk destructive action.",
  },
];

const authHighlights = [
  ["Automation health", "96%", LayoutDashboard],
  ["Invoice alert", "12 due", Bell],
  ["Team access", "8 roles", ShieldCheck],
];

function getRouteFromLocation(): Route {
  if (window.location.pathname === "/product") return "product";
  if (window.location.pathname === "/pricing") return "pricing";
  if (window.location.pathname === "/customers") return "customers";
  if (window.location.pathname === "/contact") return "contact";
  if (window.location.pathname === "/login") return "login";
  if (window.location.pathname === "/register") return "register";
  return "landing";
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 text-ink" aria-label="NusaFlow home">
      <span className="flex h-9 w-11 items-center justify-center overflow-hidden rounded-[18px] bg-ink">
        <img
          src="/nusaflow-logo.png"
          alt=""
          className="h-full w-full object-contain p-1.5"
          aria-hidden="true"
        />
      </span>
      <span className="text-sm font-semibold tracking-[-0.01em]">NusaFlow</span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[30px] font-semibold leading-[1.2] tracking-[-0.75px] text-ink sm:text-[36px] sm:leading-[1.11] sm:tracking-[-0.9px]">
        {title}
      </h2>
      {copy ? <p className="mt-4 max-w-2xl text-base leading-[1.5] text-mid-gray">{copy}</p> : null}
    </div>
  );
}

function StatBlock({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div>
      <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
        {label}
      </p>
      <p className="mt-2 text-[36px] font-semibold leading-[1.11] tracking-[-0.9px] text-ink">
        {value}
      </p>
      <Progress value={progress} className="mt-4 h-2" />
    </div>
  );
}

function SearchTrigger() {
  return (
    <button className="hidden h-9 min-w-64 items-center justify-between rounded-[18px] bg-canvas px-3 text-sm text-mid-gray md:flex">
      <span className="flex items-center gap-2">
        <Search className="size-4" />
        Search workflows...
      </span>
      <kbd className="rounded-[6px] border border-hairline bg-paper px-1.5 text-[12px] text-mid-gray">
        Ctrl K
      </kbd>
    </button>
  );
}

function DemoDialog({ triggerClassName }: { triggerClassName?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          Request demo
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Badge className="w-fit">Demo</Badge>
          <DialogTitle>Lihat workflow di data operasional kamu.</DialogTitle>
          <DialogDescription>
            Isi detail singkat. Form ini memakai komponen Dialog, Input, Label, dan Button dari
            shadcn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-1 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="demo-name">Nama</Label>
            <Input id="demo-name" placeholder="Ayu Lestari" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-email">Email kerja</Label>
            <Input id="demo-email" type="email" placeholder="ayu@company.co" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="demo-company">Perusahaan</Label>
            <Input id="demo-company" placeholder="Nama bisnis kamu" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex" aria-label="Navigasi utama">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 text-sm text-mid-gray outline-none hover:text-ink">
                  Platform
                  <ChevronDown className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Product</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Workflow />
                  Workflow builder
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2 />
                  Revoke access
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {navItems.map(([item, href]) => (
              <a key={item} href={href} className="text-sm text-mid-gray hover:text-ink">
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <SearchTrigger />
          <Button asChild variant="ghost">
            <a href="/login">Login</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/register">Register</a>
          </Button>
          <DemoDialog />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Buka menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription>Navigation</SheetDescription>
            </SheetHeader>
            <div className="mt-8 grid gap-2">
              {navItems.map(([item, href]) => (
                <SheetClose asChild key={item}>
                  <a href={href} className="rounded-[18px] bg-canvas px-3 py-2 text-sm text-ink">
                    {item}
                  </a>
                </SheetClose>
              ))}
              <Separator className="my-2" />
              <Button asChild variant="secondary">
                <a href="/login">Login</a>
              </Button>
              <Button asChild>
                <a href="/register">Register</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function ProductMockup() {
  return (
    <Card className="gap-4">
      <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-between">
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
              <div key={code} className="grid grid-cols-[1fr_1fr_auto] gap-3 rounded-[10px] bg-surface-alt p-3 text-sm">
                <span className="font-medium">{code}</span>
                <span className="text-mid-gray">{name}</span>
                <span>{amount}</span>
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

function DashboardTab({ items }: { items: Metric[] }) {
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

function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-paper py-10 text-mid-gray">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-sm">
            Professional shadcn/ui pages built with the design.md monochrome system.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {navItems.map(([item, href]) => (
            <a key={item} href={href} className="hover:text-ink">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function PageFrame({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <Header />
      <section className="border-b border-hairline pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 max-w-3xl text-[48px] font-semibold leading-[1.1] tracking-[-2.4px]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.5] text-mid-gray">{copy}</p>
        </div>
      </section>
      {children}
      <SiteFooter />
    </main>
  );
}

function ProductPage() {
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

function PricingPage() {
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
          <div className="mb-8 flex w-fit items-center gap-3 rounded-[24px] border border-hairline bg-paper p-3 shadow-subtle">
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
                    <span className="text-[36px] font-semibold leading-[1.11] tracking-[-0.9px]">
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

function CustomersPage() {
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

function ContactPage() {
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

function LandingPage() {
  const [annual, setAnnual] = useState(true);
  const activePrice = useMemo(
    () => (plan: (typeof plans)[number]) => {
      if (plan.name === "Scale") return "Custom";
      return `Rp${annual ? plan.annual : plan.monthly}rb`;
    },
    [annual],
  );

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <Header />

      <section id="hero" className="border-b border-hairline pt-16">
        <div className="mx-auto grid min-h-[calc(92svh-4rem)] max-w-[1280px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <Badge className="mb-5">clinical blueprint</Badge>
            <h1 className="max-w-2xl text-[48px] font-semibold leading-[1.1] tracking-[-2.4px]">
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
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
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
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              eyebrow="Problem"
              title="Manual work creates noise. The UI should not."
              copy="Card surfaces, compact type, and functional icons make the value proposition visible without decorative color."
            />
          </div>
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
            <Tabs defaultValue="ops" className="rounded-[24px] border border-hairline bg-paper p-5 shadow-subtle">
              <TabsList className="mb-4">
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
            <SectionHeading
              eyebrow="Pricing"
              title="Pricing with a monochrome switch."
            />
            <div className="flex items-center gap-3 rounded-[24px] border border-hairline bg-paper p-3 shadow-subtle">
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
                    <span className="text-[36px] font-semibold leading-[1.11] tracking-[-0.9px]">
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
          <h2 className="text-[36px] font-semibold leading-[1.11] tracking-[-0.9px]">
            Ready to inspect the workflow?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mid-gray">
            The final CTA uses the same pill buttons, large radius card, and monochrome surface
            stack.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
            <DemoDialog />
              <Button asChild variant="secondary">
                <a href="/register">Create account</a>
              </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline bg-paper py-10 text-mid-gray">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <Logo />
            <p className="mt-3 max-w-md text-sm">
              shadcn/ui landing page rebuilt from the design.md monochrome reference.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            {navItems.map(([item, href]) => (
              <a key={item} href={href} className="hover:text-ink">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden border-r border-hairline bg-surface-alt p-8 lg:flex lg:flex-col lg:justify-between">
          <Logo />
          <div>
            <Badge>Auth</Badge>
            <h1 className="mt-4 max-w-lg text-[48px] font-semibold leading-[1.1] tracking-[-2.4px]">
              Account access with quiet infrastructure styling.
            </h1>
            <p className="mt-5 max-w-md text-base leading-[1.5] text-mid-gray">
              The auth pages use the same shadcn form primitives and the same radius hierarchy.
            </p>
          </div>
          <div className="grid gap-3">
            {authHighlights.map(([label, value, Icon]) => (
              <div key={label as string} className="flex items-center justify-between rounded-[24px] border border-hairline bg-paper p-5 shadow-subtle">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-[18px] bg-canvas text-ink">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm text-mid-gray">{label as string}</span>
                </div>
                <span className="font-semibold">{value as string}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <Button asChild variant="secondary">
                <a href="/">
                  <ArrowLeft />
                  Home
                </a>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <Badge className="w-fit">{isRegister ? "Create account" : "Welcome back"}</Badge>
                <CardTitle className="text-[24px] leading-[1.33] tracking-[-0.6px]">
                  {isRegister ? "Register workspace" : "Login to workspace"}
                </CardTitle>
                <CardDescription>
                  {isRegister
                    ? "Create your first workspace with compact shadcn form controls."
                    : "Continue to your monochrome operations dashboard."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isRegister ? (
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                      <Input id="company" placeholder="Nusa Retail" className="pl-9" />
                    </div>
                  </div>
                ) : null}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                    <Input id="email" type="email" placeholder="nama@company.co" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                    <Input id="password" type="password" placeholder="Minimal 8 karakter" className="px-9" />
                    <Eye className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <Label className="flex items-center gap-2 text-mid-gray">
                    <Checkbox />
                    {isRegister ? "I agree to terms" : "Remember me"}
                  </Label>
                  {!isRegister ? (
                    <a href="/login" className="text-ink hover:underline">
                      Forgot password?
                    </a>
                  ) : null}
                </div>
                <Button className="w-full">
                  {isRegister ? "Create workspace" : "Login"}
                  <ArrowRight />
                </Button>
                <div className="relative py-1">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-3 text-xs text-mid-gray">
                    or
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  Continue with Google
                </Button>
              </CardContent>
              <CardFooter className="justify-center text-sm text-mid-gray">
                {isRegister ? "Already have an account?" : "No account yet?"}
                <a href={isRegister ? "/login" : "/register"} className="ml-1 font-medium text-ink hover:underline">
                  {isRegister ? "Login" : "Register"}
                </a>
              </CardFooter>
            </Card>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-[18px] px-3 py-2 text-sm text-ember">
              <Trash2 className="size-4" />
              Delete demo workspace
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function App() {
  const [route, setRoute] = useState<Route>(getRouteFromLocation);

  useEffect(() => {
    const syncRoute = () => setRoute(getRouteFromLocation());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  if (route === "product") return <ProductPage />;
  if (route === "pricing") return <PricingPage />;
  if (route === "customers") return <CustomersPage />;
  if (route === "contact") return <ContactPage />;
  if (route === "login") return <AuthPage mode="login" />;
  if (route === "register") return <AuthPage mode="register" />;

  return <LandingPage />;
}

export default App;
