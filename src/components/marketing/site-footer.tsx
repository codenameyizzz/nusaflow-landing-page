import { Link } from "react-router-dom";
import { navItems } from "@/data/site";
import { Logo } from "./logo";

export function SiteFooter() {
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
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
