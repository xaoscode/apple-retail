import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ChainableCommander, Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public multi(): ChainableCommander {
    return this.redis.multi();
  }

  public hset(key: string, field: string, value: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.hset(key, field, value);
  }

  public hdel(key: string, fields: (string | Buffer)[], multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.hdel(key, ...fields);
  }

  public hget(key: string, field: string, multi?: ChainableCommander): ChainableCommander | Promise<string> {
    const client = multi || this.redis;

    return client.hget(key, field);
  }

  public hgetall(key: string, multi?: ChainableCommander): ChainableCommander | Promise<Record<string, string>> {
    const client = multi || this.redis;

    return client.hgetall(key);
  }

  public zadd(key: string, score: number, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.zadd(key, score);
  }

  public zrange(key: string, min: string | number, max: string | number, withscores: 'WITHSCORES', multi?: ChainableCommander): ChainableCommander | Promise<Array<string>> {
    const client = multi || this.redis;

    return client.zrange(key, min, max, withscores);
  }

  public sadd(hash: string, value: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.sadd(hash, value);
  }

  public sRem(hash: string, setMembers: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.srem(hash, setMembers);
  }

  public sMembers(hash: string): Promise<string[]> {
    return this.redis.smembers(hash);
  }

  public expire(key: string, time: number, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.expire(key, time);
  }

  public async exec(multi: ChainableCommander): Promise<void> {
    const client = multi || this.redis;
    await client.exec();
  }
}
