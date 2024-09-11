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
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    const { cookie, token } = this.authService.getCookieWithJwtRefreshToken(user.id);
    ``;
    await this.authCacheService.saveRefreshToRedis(user.id, token);

    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.authCacheService.removeRefreshTokenFromRedis(request.user.id, request.cookies?.Refresh);

    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
