import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import {
  Activity,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/auth-context";

const adminNavItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Activity", href: "/admin/activity", icon: Activity },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-0 hidden h-screen border-r border-hairline bg-surface-alt lg:flex lg:flex-col">
          <AdminSidebar onLogout={handleLogout} />
        </aside>
        <section className="min-w-0">
          <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur lg:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <Logo />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open admin menu">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[min(88vw,320px)]">
                  <SheetHeader>
                    <SheetTitle>
                      <Logo />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 h-[calc(100vh-8rem)]">
                    <AdminSidebar onLogout={handleLogout} mobile />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <Badge>Admin CMS</Badge>
                <h1 className="mt-3 text-[30px] font-semibold leading-[1.2] tracking-[-0.75px]">
                  NusaFlow control panel
                </h1>
              </div>
              <div className="flex items-center gap-3 rounded-[24px] border border-hairline bg-paper p-3 shadow-subtle">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-ink text-sm font-medium text-surface-alt">
                    {getInitials(user?.name ?? "Admin")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user?.name}</p>
                  <p className="truncate text-xs text-mid-gray">{user?.email}</p>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminSidebar({ onLogout, mobile = false }: { onLogout: () => void; mobile?: boolean }) {
  return (
    <div className="flex h-full min-h-0 flex-col p-5">
      <div className={mobile ? "hidden" : "shrink-0"}>
        <Logo />
      </div>
      <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-1">
        <nav className="grid gap-1" aria-label="Admin navigation">
          {adminNavItems.map(({ label, href, icon: Icon }) => (
            <AdminNavLink key={href} href={href} label={label} icon={Icon} mobile={mobile} />
          ))}
        </nav>
      </div>
      <div className="grid shrink-0 gap-3 pt-5">
        <Separator />
        <Button asChild variant="secondary">
          <Link to="/">
            <Home />
            Back to site
          </Link>
        </Button>
        <Button variant="destructive" onClick={onLogout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
}

function AdminNavLink({
  href,
  label,
  icon: Icon,
  mobile,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  mobile: boolean;
}) {
  const link = (
    <NavLink
      to={href}
      end={href === "/admin"}
      className={({ isActive }) =>
        [
          "flex h-10 items-center gap-3 rounded-[18px] px-3 text-sm transition-colors",
          isActive ? "bg-ink text-surface-alt" : "text-mid-gray hover:bg-canvas hover:text-ink",
        ].join(" ")
      }
    >
      <Icon className="size-4" />
      {label}
    </NavLink>
  );

  return mobile ? <SheetClose asChild>{link}</SheetClose> : link;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
