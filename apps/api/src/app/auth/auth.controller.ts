import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import JwtAuthenticationGuard from './jwt-auth.guard';
import { AuthCacheService } from './auth-caсhe.service';
import JwtRefreshGuard from './jwt-refresh.guard';
import { ApiBody } from '@nestjs/swagger';
import LogInDto from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCacheService: AuthCacheService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  @ApiBody({ type: LogInDto })
  async logIn(@Req() request: RequestWithUser) {
    console.log('login');
    const { user } = request;
    const { accessToken, accessExp } = this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, refreshExp } = await this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authCacheService.saveRefreshToRedis(user.id, refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.nickname,
      },

      backendTokens: {
        accessToken,
        refreshToken,
        expiresIn: new Date().setTime(Number(new Date().getTime() + accessExp * 60)),
      },
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    console.log('auth');
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request) {
    console.log('refresh');
    const { user } = request;

    const { accessToken, accessExp } = this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, refreshExp } = await this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authCacheService.saveRefreshToRedis(user.id, refreshToken);
    return { accessToken, refreshToken, expiresIn: new Date().setTime(Number(new Date().getTime() + accessExp * 600)) };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    console.log('logout');
    await this.authCacheService.removeRefreshTokenFromRedis(request.user.id, request.cookies?.Refresh);

    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
