import type { User } from "@prisma/client";

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: User["role"];
  createdAt: Date;
  updatedAt: Date;
};

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
