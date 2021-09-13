import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AlunosModule } from 'src/alunos/alunos.module';
import { TokenModule } from 'src/token/token.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { AuthService } from './shared/auth.service';
import { jwtConstants } from './shared/constants';

@Module({
  imports: [
    UsersModule,
    AlunosModule,
    TokenModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.privateKey,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'RS256',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    TokenService,
    PrismaService,
    JwtStrategy,
  ],
})
export class AuthModule {}
