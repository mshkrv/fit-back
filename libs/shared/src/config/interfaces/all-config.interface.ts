import { IAppConfig } from './app-config.interface';
import { IDatabaseConfig } from './database-config.interface';
import { IJwtConfig } from './jwt-config.interface';
import { IRabbitMqConfig } from './rabbitmq-config.interface';

export interface IAllConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
  rabbitmq: IRabbitMqConfig;
}
