import { Link } from "react-router-dom";
import { navItems } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-paper text-mid-gray">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-lg">
          <div className="flex flex-wrap items-center gap-3">
            <Logo />
            <Badge variant="outline">Workflow OS</Badge>
          </div>
          <p className="mt-4 text-sm leading-[1.63]">
            NusaFlow is an operational SaaS interface for invoice follow-up, order fulfillment,
            customer recovery, and CMS-managed service catalogs.
          </p>
          <div className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
            <span className="rounded-[18px] bg-canvas px-3 py-2">Invoice queues</span>
            <span className="rounded-[18px] bg-canvas px-3 py-2">Order workflows</span>
            <span className="rounded-[18px] bg-canvas px-3 py-2">Customer inbox</span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
              Product
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
              <Link to="/login" className="hover:text-ink">Login</Link>
              <Link to="/register" className="hover:text-ink">Register</Link>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
              Admin
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              <Link to="/admin" className="hover:text-ink">Overview</Link>
              <Link to="/admin/products" className="hover:text-ink">Product CMS</Link>
              <Link to="/admin/users" className="hover:text-ink">User management</Link>
              <Link to="/admin/activity" className="hover:text-ink">Activity</Link>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Copyright Yizreel Schwartz Sipahutar 2026.</p>
        <p>Built with React, NestJS, Prisma, PostgreSQL, Tailwind, and shadcn/ui.</p>
      </div>
    </footer>
  );
}
