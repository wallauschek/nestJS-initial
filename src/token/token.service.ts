import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { Prisma, Token } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTokenDto): Promise<Token> {
    const { userId } = dto;
    delete dto.userId;
    const token = `${userId}${crypto.randomBytes(64).toString('hex')}`;

    const data: Prisma.TokenCreateInput = {
      ...dto,
      refreshToken: token,
      valid: true,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return this.prisma.token.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async findOne(refreshToken: string): Promise<Token | null> {
    return this.prisma.token
      .findUnique({
        where: { refreshToken },
        include: { user: true },
      })
      .then((token) => {
        if (!token) {
          throw new EntityNotFoundError(
            `RefreshToken #${refreshToken} was not found.`,
          );
        }
        return token;
      });
  }

  async SetInvalidateRefreshToken(refreshToken: string): Promise<Token | null> {
    this.findOne(refreshToken);
    const data: Prisma.TokenUpdateInput = {
      valid: false,
    };

    return this.prisma.token.update({
      where: { refreshToken },
      data,
    });
  }

  async SetInvalidateAllUserRefreshToken(
    refreshToken: string,
  ): Promise<Token | null> {
    const token = await this.prisma.token.findUnique({
      where: { refreshToken },
      include: { user: true },
    });
    const data: Prisma.TokenUpdateInput = {
      valid: false,
    };

    this.prisma.token.updateMany({
      where: { user: token.user },
      data,
    });

    return token;
  }
}
