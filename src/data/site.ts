import {
  Bell,
  Clock3,
  CreditCard,
  FileText,
  Inbox,
  LayoutDashboard,
  MessageSquareText,
  Package,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Metric = [label: string, value: string, progress: number];

export type IconContent = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

export const navItems = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/customers" },
  { label: "Contact", href: "/contact" },
];

export const pains: IconContent[] = [
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

export const features: IconContent[] = [
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

export const workflowTemplates: Array<IconContent & { meta: string; steps: string[] }> = [
  {
    icon: ReceiptText,
    title: "Invoice follow-up",
    meta: "Finance template",
    copy: "Tag invoice yang jatuh tempo, kirim reminder internal, dan eskalasi piutang besar ke owner.",
    steps: ["Detect due date H-3", "Assign finance owner", "Escalate unpaid invoices"],
  },
  {
    icon: ShoppingCart,
    title: "Order fulfillment",
    meta: "Operations template",
    copy: "Ubah order masuk menjadi checklist picking, packing, shipping, dan update customer otomatis.",
    steps: ["Validate payment", "Reserve stock", "Trigger shipment note"],
  },
  {
    icon: Inbox,
    title: "Customer recovery",
    meta: "Support template",
    copy: "Prioritaskan komplain pelanggan, simpan konteks order, dan buat follow-up tanpa chat manual.",
    steps: ["Classify message", "Attach order context", "Schedule follow-up"],
  },
];

export const operationalModules: Array<IconContent & { metric: string }> = [
  {
    icon: ReceiptText,
    title: "Invoice module",
    copy: "Piutang, invoice jatuh tempo, payment status, dan cash-in harian berada di satu panel kerja.",
    metric: "Rp84.6jt tracked",
  },
  {
    icon: ShoppingCart,
    title: "Order module",
    copy: "Order baru, status fulfillment, shipment delay, dan retur terbuka dipantau per queue.",
    metric: "142 ready to ship",
  },
  {
    icon: MessageSquareText,
    title: "Customer module",
    copy: "Inbox pelanggan, notes tim, SLA respons, dan lead follow-up tidak tercecer di chat.",
    metric: "9 open messages",
  },
  {
    icon: Package,
    title: "Catalog module",
    copy: "Produk dan service yang tampil ke user dikelola dari CMS admin dengan status draft/published.",
    metric: "CMS powered",
  },
];

export const activityTimeline = [
  {
    title: "Invoice INV-2408 moved to escalation",
    copy: "Finance owner assigned after payment was overdue for 3 days.",
    time: "09:10",
  },
  {
    title: "Order ORD-884 marked ready to ship",
    copy: "Inventory signal confirmed stock reservation and packing checklist.",
    time: "10:35",
  },
  {
    title: "Customer follow-up scheduled",
    copy: "Support team attached order context before sending recovery note.",
    time: "13:20",
  },
];

export const operationalRecords = [
  ["Invoice", "INV-2408", "Due today", "Rp12.4jt"],
  ["Order", "ORD-884", "Ready to ship", "42 items"],
  ["Customer", "Ayu Lestari", "Follow-up", "SLA 2h"],
] as const;

export const dashboardMetrics: Record<"ops" | "finance" | "customers", Metric[]> = {
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

export const workflowSteps = [
  "Connect order, invoice, inventory, and customer records.",
  "Choose a workflow template or define compact business rules.",
  "Review the dashboard and remove manual steps every week.",
];

export const testimonials = [
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

export const plans = [
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

export const faqs = [
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

export const authHighlights: Array<{
  label: string;
  value: string;
  icon: LucideIcon;
}> = [
  { label: "Automation health", value: "96%", icon: LayoutDashboard },
  { label: "Invoice alert", value: "12 due", icon: Bell },
  { label: "Team access", value: "8 roles", icon: ShieldCheck },
];
