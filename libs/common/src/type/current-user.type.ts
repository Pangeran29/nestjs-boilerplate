import { ERole } from '@prisma/client';

export type TCurrentUser = {
  sub: number;
  role: ERole;
};
