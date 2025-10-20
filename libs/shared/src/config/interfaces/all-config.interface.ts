import { IAppConfig } from './app-config.interface';
import { IDatabaseConfig } from './database-config.interface';
import { IJwtConfig } from './jwt-config.interface';
import { IRabbitMqConfig } from './rabbitmq-config.interface';
import { IRedisConfig } from './redis-config.interface';

export interface IAllConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
  rabbitmq: IRabbitMqConfig;
  redis: IRedisConfig;
}
