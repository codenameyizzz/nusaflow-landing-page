import { ChevronDown, LayoutDashboard, Menu, Search, Trash2, Workflow } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "@/data/site";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { DemoDialog } from "./demo-dialog";
import { Logo } from "./logo";

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

export function SiteHeader() {
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
                <DropdownMenuItem asChild>
                  <Link to="/product">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/product">
                    <Workflow />
                    Workflow builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2 />
                  Revoke access
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "text-sm text-ink" : "text-sm text-mid-gray hover:text-ink"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <SearchTrigger />
          <Button asChild variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">Register</Link>
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
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link to={item.href} className="rounded-[18px] bg-canvas px-3 py-2 text-sm text-ink">
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
              <Separator className="my-2" />
              <Button asChild variant="secondary">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
