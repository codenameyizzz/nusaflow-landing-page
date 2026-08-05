import { ConflictException, Injectable } from "@nestjs/common";
import type { User, UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { toPublicUser } from "./user.presenter";

type CreateUserInput = {
  email: string;
  name: string;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async create(input: CreateUserInput): Promise<User> {
    const existing = await this.findByEmail(input.email);

    if (existing) {
      throw new ConflictException("Email is already registered");
    }

    return this.prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        name: input.name,
        passwordHash: input.passwordHash,
      },
    });
  }

  countUsers() {
    return this.prisma.user.count();
  }

  countUsersByRole(role: UserRole) {
    return this.prisma.user.count({
      where: { role },
    });
  }

  async findRecentUsers(take = 8) {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take,
    });

    return users.map(toPublicUser);
  }
}
