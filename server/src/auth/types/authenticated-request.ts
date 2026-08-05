import type { Request } from "express";
import type { PublicUser } from "../../users/user.presenter";

export type AuthenticatedRequest = Request & {
  user: PublicUser;
};
