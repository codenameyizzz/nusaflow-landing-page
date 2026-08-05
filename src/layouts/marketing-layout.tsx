import { Outlet } from "react-router-dom";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function MarketingLayout() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </main>
  );
}
