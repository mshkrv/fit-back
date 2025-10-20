import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IAllConfig,
  IAppConfig,
  IDatabaseConfig,
  IJwtConfig,
  IRabbitMqConfig,
  IRedisConfig,
} from './interfaces';
import { EnvironmentEnum } from '../enum';

@Injectable()
export class FitConfigService {
  constructor(
    private readonly configService: ConfigService<IAllConfig, true>,
  ) {}

  get app(): IAppConfig {
    return this.configService.getOrThrow('app', { infer: true });
  }

  get database(): IDatabaseConfig {
    return this.configService.getOrThrow('database', { infer: true });
  }

  get jwt(): IJwtConfig {
    return this.configService.getOrThrow('jwt', { infer: true });
  }

  get rabbitmq(): IRabbitMqConfig {
    return this.configService.getOrThrow('rabbitmq', { infer: true });
  }
  get redis(): IRedisConfig {
    return this.configService.getOrThrow('redis', { infer: true });
  }

  get isSwaggerEnabled(): boolean {
    return (
      this.app.swagger.enabled &&
      this.app.nodeEnv !== EnvironmentEnum.production
    );
  }
}
