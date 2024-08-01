import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ChainableCommander, Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public multi(): ChainableCommander {
    return this.redis.multi();
  }

  public hSet(key: string, field: string, value: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.hset(key, field, value);
  }

  public hDel(key: string, field: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.hdel(key, field);
  }

  public hGet(key: string, field: string, multi?: ChainableCommander): ChainableCommander | Promise<string> {
    const client = multi || this.redis;

    return client.hget(key, field);
  }

  public hGetAll(key: string): Promise<Record<string, string>> {
    return this.redis.hgetall(key);
  }
  public hKeys(key: string): Promise<string[]> {
    return this.redis.hkeys(key);
  }
  public keys(key: string): Promise<string[]> {
    return this.redis.keys(key);
  }

  public zAdd(key: string, score: number, value: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.zadd(key, score, value);
  }

  public zRange(key: string, min: string | number, max: string | number, withscores: 'WITHSCORES', multi?: ChainableCommander): ChainableCommander | Promise<Array<string>> {
    const client = multi || this.redis;

    return client.zrange(key, min, max, withscores);
  }

  public sAdd(key: string, value: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.sadd(key, value);
  }

  public sRem(key: string, member: string, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.srem(key, member);
  }

  public sMembers(key: string): Promise<string[]> {
    return this.redis.smembers(key);
  }

  public expire(key: string, time: number, multi?: ChainableCommander): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.expire(key, time);
  }

  public set(key: string, value: string, multi?: ChainableCommander): ChainableCommander | Promise<'OK'> {
    const client = multi || this.redis;

    return client.set(key, value);
  }

  public get(key: string, multi?: ChainableCommander): ChainableCommander | Promise<string> {
    const client = multi || this.redis;

    return client.get(key);
  }

  public del(multi?: ChainableCommander, ...keys: string[]): ChainableCommander | Promise<number> {
    const client = multi || this.redis;

    return client.del(keys);
  }

  public async exec(multi: ChainableCommander): Promise<void> {
    const client = multi || this.redis;
    await client.exec();
  }
}
