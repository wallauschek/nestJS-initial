import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const passwordHash = await hash(dto.password, 8);
    const data: Prisma.UserCreateInput = {
      ...dto,
      password: passwordHash,
    };

    return this.prisma.user.create({
      data,
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user
      .findUnique({ where: { id }, include: { posts: true } })
      .then((user) => {
        if (!user) {
          throw new EntityNotFoundError(`User with id #${id} was not found.`);
        }
        return user;
      });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: string, dto: UpdateUserDto): Promise<User> {
    this.findOne(id);
    const data: Prisma.UserUpdateInput = {
      ...dto,
    };

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<User> {
    this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
