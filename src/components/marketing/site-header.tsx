import { ChevronDown, LayoutDashboard, LogOut, Menu, Search, Trash2, User, Workflow } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navItems } from "@/data/site";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useAuth } from "@/contexts/auth-context";
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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function SiteHeader() {
  const { user, isCheckingSession, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex h-9 items-center gap-2 rounded-[18px] bg-paper px-2 pr-3 text-sm text-ink shadow-subtle outline-none hover:bg-surface-alt">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-ink text-[12px] font-medium text-surface-alt">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-32 truncate">{user.name}</span>
                  <ChevronDown className="size-4 text-mid-gray" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <span className="block truncate">{user.name}</span>
                  <span className="block truncate text-xs font-normal text-mid-gray">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/product">
                    <User />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/product">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isCheckingSession ? (
            <div className="h-9 w-28 rounded-[18px] bg-paper shadow-subtle" />
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
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
              {user ? (
                <div className="grid gap-2">
                  <div className="rounded-[24px] border border-hairline bg-paper p-4 shadow-subtle">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-ink text-sm font-medium text-surface-alt">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{user.name}</p>
                        <p className="truncate text-sm text-mid-gray">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Button asChild variant="secondary">
                      <Link to="/product">Profile</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut />
                      Logout
                    </Button>
                  </SheetClose>
                </div>
              ) : isCheckingSession ? (
                <div className="h-9 rounded-[18px] bg-paper shadow-subtle" />
              ) : (
                <>
                  <Button asChild variant="secondary">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
