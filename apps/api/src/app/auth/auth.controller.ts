import { Body, Controller, Get, HttpCode, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import JwtAuthenticationGuard from './jwt-auth.guard';
import { AuthCacheService } from './auth-caсhe.service';
import JwtRefreshGuard from './jwt-refresh.guard';
import { ApiBody } from '@nestjs/swagger';
import LogInDto from './dto/logIn.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCacheService: AuthCacheService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    console.log('register');
    const user = await this.authService.register(dto);

    const { accessToken, accessExp } = await this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, refreshExp } = await this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authCacheService.saveRefreshToRedis(user.id, refreshToken);
    const currentTime = new Date();
    return {
      user: {
        id: user.id,
        email: user.email,
        image: user.image,
        role: user.role,
      },

      backendTokens: {
        accessToken,
        accessExp: new Date(currentTime.getTime() + accessExp * 1000).getTime(),
        refreshToken,
        refreshExp: new Date(currentTime.getTime() + refreshExp * 1000).getTime(),
      },
    };
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  @ApiBody({ type: LogInDto })
  async logIn(@Req() request: RequestWithUser) {
    console.log('login');
    const { user } = request;
    const { accessToken, accessExp } = await this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, refreshExp } = await this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authCacheService.saveRefreshToRedis(user.id, refreshToken);
    const currentTime = new Date();
    console.log({
      id: user.id,
      email: user.email,
      image: user.image,
      role: user.role,
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        image: user.image,
        role: user.role,
      },

      backendTokens: {
        accessToken,
        accessExp: new Date(currentTime.getTime() + accessExp * 1000).getTime(),
        refreshToken,
        refreshExp: new Date(currentTime.getTime() + refreshExp * 1000).getTime(),
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
  async refresh(@Req() request: RequestWithUser) {
    console.log('refresh');
    const { user } = request;

    const { accessToken, accessExp } = await this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, refreshExp } = await this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authCacheService.saveRefreshToRedis(user.id, refreshToken);
    const currentTime = new Date();
    return {
      accessToken,
      accessExp: new Date(currentTime.getTime() + accessExp * 1000).getTime(),
      refreshToken,
      refreshExp: new Date(currentTime.getTime() + refreshExp * 1000).getTime(),
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    console.log('logout');
    await this.authCacheService.removeRefreshTokenFromRedis(request.user.id, request.cookies?.Refresh);
    return true;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() user: RequestWithUser, @Body() a) {
    console.log('upload');
    console.log(file);
    console.log(a);
    await this.authService.saveAvatar(file, user);
    return {
      message: 'FIle UPload seccessfully',
      filename: file.filename,
    };
  }
}
