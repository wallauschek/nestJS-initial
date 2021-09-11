import { Prisma } from '@prisma/client';

export class Post implements Prisma.PostUncheckedCreateInput {
  id?: string;
  title: string;
  content?: string;
  published?: boolean;
  authorId?: string;
}
