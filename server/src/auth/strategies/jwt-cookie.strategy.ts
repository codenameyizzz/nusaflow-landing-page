import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { toPublicUser } from "../../users/user.presenter";
import { UsersService } from "../../users/users.service";
import type { JwtPayload } from "../types/jwt-payload";

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const cookieName = config.getOrThrow<string>("JWT_COOKIE_NAME");
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.[cookieName] ?? null,
      ]),
      secretOrKey: config.getOrThrow<string>("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException("Invalid authentication token");
    }

    return toPublicUser(user);
  }
}
