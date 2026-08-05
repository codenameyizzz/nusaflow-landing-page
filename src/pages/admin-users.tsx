import { useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { adminApi, type PublicUser } from "@/lib/auth-api";

export function AdminUsersPage() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    adminApi
      .users()
      .then(setUsers)
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : "Gagal membaca users.");
      });
  }, []);

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return users;

    return users.filter((user) =>
      [user.name, user.email, user.role].some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [users, query]);

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
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users..."
              className="pl-9"
            />
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
              className="grid gap-3 border-b border-hairline bg-paper px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1fr_1fr_auto]"
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
            </div>
          ))}
          {!filteredUsers.length ? (
            <p className="px-4 py-4 text-sm text-mid-gray">Tidak ada user yang cocok.</p>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
