import { JwtToken } from "@app/common/jwt/type";
import { $Enums } from "@prisma/client";

export type UserAccessToken = JwtToken & {
  sub: number;
  role: $Enums.UserRole;
  username: string;
};
