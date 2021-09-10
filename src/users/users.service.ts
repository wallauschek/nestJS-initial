import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...dto,
    };

    return this.prisma.user.create({
      data,
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<User | null> {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (user.catch) {
      throw new EntityNotFoundError(`User with id #${id} was not found.`);
    }
    return user;
  }

  update(id: number, dto: UpdateUserDto): Promise<User> {
    this.findOne(id);
    const data: Prisma.UserUpdateInput = {
      ...dto,
    };

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<User> {
    this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
