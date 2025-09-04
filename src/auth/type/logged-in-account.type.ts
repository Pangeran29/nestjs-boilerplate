import { Account } from '@prisma/client';

export type TLoggedInAccount = Account & {
  clinicId: number | null;
  clinicIds: number[] | null;
};
