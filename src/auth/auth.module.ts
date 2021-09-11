import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { jwtConstants } from './shared/constants';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.privateKey,
      signOptions: {
        expiresIn: '5m',
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
