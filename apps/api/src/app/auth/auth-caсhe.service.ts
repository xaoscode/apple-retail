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

  public async addRefreshToRedis(userId: string, fingerprint: string, token: string): Promise<void> {
    const key = `user:${userId}:refresh_tokens`;
    const field = `fingerprint:${fingerprint}`;

    const transaction = this.redisService.multi();

    await this.redisService.hset(key, field, token, transaction);
    await this.redisService.expire(key, this.refreshTokenExpirationTime, transaction);
  }
}
