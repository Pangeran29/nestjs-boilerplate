import { JwtToken } from "@app/common/jwt/type";
import { $Enums } from "@prisma/client";

export type UserRerfreshToken = JwtToken & {
  sub: number;
  username: string;
  role: $Enums.UserRole
};
