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

  public async saveRefreshToRedis(userId: string, refreshToken: string): Promise<void> {
    const transaction = this.redisService.multi();
    const key = `${refreshToken}:${userId}`;

    const replies = await this.redisService.hKeys(userId);

    if (replies.length >= 10) {
      replies.forEach((key) => {
        this.redisService.del(transaction, key);
      });
      this.redisService.del(transaction, userId);
      //some logic for user notificaton about suspicious activities
    }

    await this.redisService.hSet(userId, key, refreshToken, transaction);
    await this.redisService.expire(userId, this.refreshTokenExpirationTime, transaction);

    await this.redisService.sAdd(key, refreshToken, transaction);
    await this.redisService.expire(key, this.refreshTokenExpirationTime, transaction);

    await this.redisService.exec(transaction);
  }

  public async removeRefreshTokenFromRedis(userId: string, refreshToken: string) {
    const transaction = this.redisService.multi();
    const key = `${refreshToken}:${userId}`;

    await this.redisService.hDel(userId, key, transaction);
    await this.redisService.del(transaction, key);

    await this.redisService.exec(transaction);
  }

  public async verifRefreshToken(userId: string, refreshToken: string) {
    const key = `${refreshToken}:${userId}`;
    const tokenExists = await this.redisService.sMembers(key);

    return tokenExists.some((token: string) => token === refreshToken);
  }
}
