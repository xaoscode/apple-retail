import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { AuthCacheService } from './auth-caсhe.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authCacheService: AuthCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    return this.authCacheService.verifRefreshToken(payload.userId, refreshToken);
  }
}
