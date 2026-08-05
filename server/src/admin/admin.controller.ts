import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { PublicUser } from "../users/user.presenter";
import { UsersService } from "../users/users.service";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";

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

  @Get("users")
  users() {
    return this.usersService.findUsersForAdmin();
  }

  @Patch("users/:id/role")
  updateUserRole(
    @Param("id") id: string,
    @Body() dto: UpdateUserRoleDto,
    @CurrentUser() currentUser: PublicUser,
  ) {
    return this.usersService.updateRoleByAdmin(id, dto.role, currentUser.id);
  }

  @Delete("users/:id")
  removeUser(@Param("id") id: string, @CurrentUser() currentUser: PublicUser) {
    return this.usersService.removeByAdmin(id, currentUser.id);
  }
}
