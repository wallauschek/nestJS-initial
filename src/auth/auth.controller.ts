import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, refreshTokenExpiration } =
      await this.authService.login(req.user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: refreshTokenExpiration,
    });
    return { accessToken };
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/refreshToken')
  async refreshToken(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, refreshTokenExpiration } =
      await this.authService.refreshToken(req.cookies.refreshToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: refreshTokenExpiration,
    });
    return { accessToken };
  }
}
