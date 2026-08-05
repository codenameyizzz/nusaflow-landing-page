import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck, Trash2, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { adminApi, type PublicUser } from "@/lib/auth-api";

type RoleFilter = "ALL" | PublicUser["role"];

export function AdminUsersPage() {
  const { user: currentUser, refreshUser } = useAuth();
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");
  const [deleteTarget, setDeleteTarget] = useState<PublicUser | null>(null);
  const [actionKey, setActionKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void loadUsers();
  }, []);

  async function loadUsers() {
    setErrorMessage("");
    try {
      setUsers(await adminApi.users());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal membaca users.");
    }
  }

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesQuery =
        !normalized ||
        [user.name, user.email, user.role].some((value) => value.toLowerCase().includes(normalized));

      return matchesRole && matchesQuery;
    });
  }, [users, query, roleFilter]);

  async function updateRole(targetUser: PublicUser, role: PublicUser["role"]) {
    setErrorMessage("");
    setActionKey(`role-${targetUser.id}`);

    try {
      const updatedUser = await adminApi.updateUserRole(targetUser.id, role);
      setUsers((current) => current.map((user) => (user.id === updatedUser.id ? updatedUser : user)));

      if (currentUser?.id === updatedUser.id) {
        await refreshUser();
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengubah role user.");
    } finally {
      setActionKey("");
    }
  }

  async function deleteUser(targetUser: PublicUser) {
    setErrorMessage("");
    setActionKey(`delete-${targetUser.id}`);

    try {
      await adminApi.removeUser(targetUser.id);
      setUsers((current) => current.filter((user) => user.id !== targetUser.id));
      setDeleteTarget(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal menghapus user.");
    } finally {
      setActionKey("");
    }
  }

  const roleCounts = {
    all: users.length,
    admin: users.filter((user) => user.role === "ADMIN").length,
    user: users.filter((user) => user.role === "USER").length,
  };

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
              Users
            </p>
            <h2 className="mt-2 text-[24px] font-semibold leading-[1.33] tracking-[-0.6px]">
              User management
            </h2>
            <p className="mt-2 text-sm text-mid-gray">Daftar akun yang sudah register ke NusaFlow.</p>
          </div>
          <div className="grid w-full gap-3 md:max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users..."
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <RoleFilterButton active={roleFilter === "ALL"} onClick={() => setRoleFilter("ALL")}>
              All {roleCounts.all}
            </RoleFilterButton>
            <RoleFilterButton active={roleFilter === "ADMIN"} onClick={() => setRoleFilter("ADMIN")}>
              Admin {roleCounts.admin}
            </RoleFilterButton>
            <RoleFilterButton active={roleFilter === "USER"} onClick={() => setRoleFilter("USER")}>
              User {roleCounts.user}
            </RoleFilterButton>
          </div>
          </div>
        </div>
      </Card>

      {errorMessage ? (
        <p className="rounded-[18px] bg-paper px-4 py-3 text-sm text-ember shadow-subtle">{errorMessage}</p>
      ) : null}

      <Card>
        <div className="overflow-hidden rounded-[18px] border border-hairline">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="grid gap-3 border-b border-hairline bg-paper px-4 py-4 text-sm last:border-b-0 lg:grid-cols-[1fr_1fr_auto_auto]"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{user.name}</p>
                <p className="truncate text-mid-gray">{user.id}</p>
              </div>
              <p className="truncate text-mid-gray">{user.email}</p>
              <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                {user.role === "ADMIN" ? <ShieldCheck /> : <UserCog />}
                {user.role}
              </Badge>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateRole(user, user.role === "ADMIN" ? "USER" : "ADMIN")}
                  disabled={actionKey === `role-${user.id}`}
                >
                  {actionKey === `role-${user.id}`
                    ? "Updating..."
                    : user.role === "ADMIN"
                      ? "Make user"
                      : "Make admin"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteTarget(user)}
                  disabled={actionKey === `delete-${user.id}`}
                >
                  <Trash2 />
                  {actionKey === `delete-${user.id}` ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
          {!filteredUsers.length ? (
            <p className="px-4 py-4 text-sm text-mid-gray">Tidak ada user yang cocok.</p>
          ) : null}
        </div>
      </Card>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete user?</DialogTitle>
            <DialogDescription>
              User "{deleteTarget?.name ?? ""}" akan dihapus dari database. Aksi ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={Boolean(actionKey)}
              onClick={() => {
                if (deleteTarget) void deleteUser(deleteTarget);
              }}
            >
              <Trash2 />
              {actionKey ? "Deleting..." : "Delete user"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RoleFilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-8 rounded-[18px] px-3 text-xs font-medium transition-colors",
        active ? "bg-ink text-surface-alt" : "bg-canvas text-ink hover:bg-hairline/60",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
