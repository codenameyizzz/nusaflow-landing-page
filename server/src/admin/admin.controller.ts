import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UsersService } from "../users/users.service";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get("overview")
  async overview() {
    const [totalUsers, adminUsers, regularUsers, latestUsers] = await Promise.all([
      this.usersService.countUsers(),
      this.usersService.countUsersByRole(UserRole.ADMIN),
      this.usersService.countUsersByRole(UserRole.USER),
      this.usersService.findRecentUsers(8),
    ]);

    return {
      stats: {
        totalUsers,
        adminUsers,
        regularUsers,
      },
      latestUsers,
    };
  }
}
