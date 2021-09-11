import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.getByEmail(userEmail);
    const passwordMatch = await compare(userPassword, user.password);
    if (user && passwordMatch) {
      const { id, name, email } = user;
      return { id, name, email };
    }
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const userId = user.id;
    const { refreshToken, expiresDate: refreshTokenExpiration } =
      await this.tokenService.create({ userId });
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken,
      refreshTokenExpiration,
    };
  }

  async refreshToken(token: string) {
    const { valid, expiresDate, user } = await this.tokenService.findOne(token);

    if (valid && expiresDate.getTime() >= Date.now()) {
      await this.tokenService.SetInvalidateRefreshToken(token);

      const { refreshToken, expiresDate: refreshTokenExpiration } =
        await this.tokenService.create({ userId: user.id });
      const payload = {
        email: user.email,
        sub: user.id,
      };
      return {
        accessToken: this.jwtService.sign(payload),
        refreshToken,
        refreshTokenExpiration,
      };
    }
  }
}
