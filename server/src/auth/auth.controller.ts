import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import type { AuthenticatedRequest } from "./types/authenticated-request";
import type { PublicUser } from "../users/user.presenter";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post("register")
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.register(dto);
    this.setAuthCookie(response, result.accessToken);

    return {
      user: result.user,
    };
  }

  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(dto);
    this.setAuthCookie(response, result.accessToken);

    return {
      user: result.user,
    };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(this.config.getOrThrow<string>("JWT_COOKIE_NAME"), {
      httpOnly: true,
      sameSite: "lax",
      secure: this.isProduction(),
      path: "/",
    });

    return {
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUser() user: PublicUser, @Req() _request: AuthenticatedRequest) {
    return {
      user,
    };
  }

  private setAuthCookie(response: Response, accessToken: string) {
    response.cookie(this.config.getOrThrow<string>("JWT_COOKIE_NAME"), accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: this.isProduction(),
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private isProduction() {
    return this.config.get<string>("NODE_ENV") === "production";
  }
}
