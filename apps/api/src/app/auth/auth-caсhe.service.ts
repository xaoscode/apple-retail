import { Injectable } from '@nestjs/common';
import { RedisService } from '../core/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthCacheService {
  private readonly refreshTokenExpirationTime: number;
  private readonly userToken: 'user_token';

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.refreshTokenExpirationTime = this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  public async saveRefreshToRedis(userId: string, fingerprint: string, token: string): Promise<void> {
    const transaction = this.redisService.multi();

    const tokenKeys = await this.redisService.hKeys(userId, transaction);

    if (tokenKeys.length > 10) {
      await this.redisService.del(transaction, userId, fingerprint);

      //some logic for user notificaton about suspicious activities
    }

    await this.redisService.hSet(userId, fingerprint, token, transaction);

    await this.redisService.sAdd(fingerprint, token, transaction);
    await this.redisService.expire(fingerprint, this.refreshTokenExpirationTime, transaction);

    await this.redisService.exec(transaction);
  }

  public async removeRefreshTokenFromRedis(userId: string, refreshToken: string, fingerprint: string) {
    const transaction = this.redisService.multi();

    await this.redisService.hDel(userId, fingerprint, transaction);
    await this.redisService.sRem(fingerprint, refreshToken, transaction);

    await this.redisService.exec(transaction);
  }

  public async verifRefreshToken(userId: string, fingerprint: string, refreshToken: string) {
    const tokenExists = await this.redisService.sMembers(fingerprint);

    return tokenExists.some((token: string) => token === refreshToken);
  }
}
