import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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

  async findUsersForAdmin() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return users.map(toPublicUser);
  }

  async updateRoleByAdmin(targetUserId: string, role: UserRole, actorUserId: string) {
    const target = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!target) {
      throw new NotFoundException("User not found");
    }

    if (target.id === actorUserId && target.role === "ADMIN" && role !== "ADMIN") {
      throw new ForbiddenException("You cannot remove your own admin access");
    }

    if (target.role === "ADMIN" && role !== "ADMIN") {
      await this.ensureAnotherAdminExists(target.id);
    }

    const user = await this.prisma.user.update({
      where: { id: target.id },
      data: { role },
    });

    return toPublicUser(user);
  }

  async removeByAdmin(targetUserId: string, actorUserId: string) {
    const target = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!target) {
      throw new NotFoundException("User not found");
    }

    if (target.id === actorUserId) {
      throw new ForbiddenException("You cannot delete your own account");
    }

    if (target.role === "ADMIN") {
      await this.ensureAnotherAdminExists(target.id);
    }

    await this.prisma.user.delete({
      where: { id: target.id },
    });

    return { success: true };
  }

  private async ensureAnotherAdminExists(excludedUserId: string) {
    const adminCount = await this.prisma.user.count({
      where: {
        role: "ADMIN",
        id: { not: excludedUserId },
      },
    });

    if (adminCount < 1) {
      throw new BadRequestException("At least one admin account must remain");
    }
  }
}
