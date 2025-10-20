import { RedisOptions } from 'ioredis';

export interface IRedisConfig extends RedisOptions {
  port: number;
  host: string;
  password: string;
}
