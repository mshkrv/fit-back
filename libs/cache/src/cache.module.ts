import {
  DynamicModule,
  Global,
  Logger,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CACHE_CLIENT } from './constants';
import Redis, { RedisOptions } from 'ioredis';

@Global()
@Module({})
export class CacheModule implements OnApplicationShutdown {
  private readonly logger: Logger = new Logger(CacheModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    try {
      const redisClient = this.moduleRef.get<Redis>(CACHE_CLIENT);

      if (redisClient && redisClient.status === 'ready') {
        this.logger.log(`Closing Redis connection (signal: ${signal})`);
        await redisClient.quit();
      }
    } catch (e: unknown) {
      const errMessage =
        e instanceof Error
          ? `Error closing Redis connection: ${e.message}`
          : 'Error closing Redis connection';
      this.logger.error(errMessage);
    }
  }

  static forRoot(options: RedisOptions = {}): DynamicModule {
    const cacheProvider: Provider = {
      provide: CACHE_CLIENT,
      useValue: this.createClient(options),
    };

    return {
      module: CacheModule,
      providers: [cacheProvider],
      exports: [cacheProvider],
    };
  }
  static forRootAsync(asyncOptions: {
    useFactory: (...args: any[]) => Promise<RedisOptions> | RedisOptions;
    inject?: any[];
  }): DynamicModule {
    const cacheProvider: Provider = {
      provide: CACHE_CLIENT,
      useFactory: async (...args: any[]) => {
        try {
          const options = await asyncOptions.useFactory(...args);
          return this.createClient(options);
        } catch (e: unknown) {
          const errMessage =
            e instanceof Error
              ? `Redis connection failed: ${e.message}`
              : 'Redis connection failed';
          throw new Error(errMessage);
        }
      },
      inject: asyncOptions?.inject || [],
    };

    return {
      module: CacheModule,
      providers: [cacheProvider],
      exports: [cacheProvider],
    };
  }

  private static createClient(options: RedisOptions) {
    const logger = new Logger(CacheModule.name);
    const redisClient = new Redis({
      ...options,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 3) {
          logger.log('Max retry attempts reached, giving up');
          return null;
        }

        const delay = Math.min(times * 100, 3000);
        logger.warn(
          `Retrying Redis connection in ${delay}ms (attempt ${times})`,
        );
        return delay;
      },
    });

    redisClient.on('connect', () => {
      logger.log('Redis connected successfully');
    });
    redisClient.on('error', (error) => {
      logger.error(`Redis connection error: ${error.message}`, error.stack);
    });
    redisClient.on('ready', () => {
      logger.log('Redis is ready to accept commands');
    });
    redisClient.on('close', () => {
      logger.warn('Redis connection closed');
    });

    return redisClient;
  }
}
