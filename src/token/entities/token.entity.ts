import { Prisma } from '@prisma/client';

export class Token implements Prisma.TokenUncheckedCreateInput {
  id: string;
  userId?: string;
  refreshToken: string;
  valid: boolean;
  expiresDate: Date;
}
