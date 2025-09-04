import { SetMetadata } from "@nestjs/common";
import { ERole } from "@prisma/client";

export const Role = (...roles: ERole[]) => SetMetadata("role", roles);
