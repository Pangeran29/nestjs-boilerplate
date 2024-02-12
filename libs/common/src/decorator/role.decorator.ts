import { SetMetadata } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export const ROLE_KEY = 'role';
export const CanAccess = (...role: $Enums.UserRole[]) =>
  SetMetadata(ROLE_KEY, role);
