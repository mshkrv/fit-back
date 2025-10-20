import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  appConfig,
  dbConfig,
  EnvironmentEnum,
  IAppConfig,
  IDatabaseConfig,
  SnakeCaseStrategy,
} from '@fit/shared';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(dbConfig.KEY) private databaseConfig: IDatabaseConfig,
    @Inject(appConfig.KEY) private baseConfig: IAppConfig,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.databaseConfig.url,
      host: this.databaseConfig.host,
      port: this.databaseConfig.port,
      username: this.databaseConfig.user,
      password: this.databaseConfig.password,
      database: this.databaseConfig.database,
      synchronize: false,
      dropSchema: false,
      keepConnectionAlive: true,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsTableName: 'fitness_migrations',
      logging: this.baseConfig.nodeEnv !== EnvironmentEnum.production,
      retryDelay: 3000,
      retryAttempts: 3,
      namingStrategy: new SnakeCaseStrategy(),
    } as TypeOrmModuleOptions;
  }
}
