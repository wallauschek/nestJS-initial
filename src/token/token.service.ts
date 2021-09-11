import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Prisma, Token } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ userId }: CreateTokenDto): Promise<Token> {
    const token = `${userId}${randomBytes(64).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    const data: Prisma.TokenCreateInput = {
      refreshToken: token,
      expiresDate: expiresAt,
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
      .then((refreshToken) => {
        if (!refreshToken) {
          throw new EntityNotFoundError(
            `RefreshToken #${refreshToken} was not found.`,
          );
        }
        return refreshToken;
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
