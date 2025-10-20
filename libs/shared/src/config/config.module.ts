import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { FitConfigService } from './config.service';
import { Environment } from './environment.schema';
import {
  appConfig,
  dbConfig,
  jwtConfig,
  rabbitmqConfig,
  redisConfig,
} from './configurations';

@Global()
@Module({})
export class FitConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const { envFilePath, ignoreEnvFile = false } = options;

    return {
      module: FitConfigModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath,
          ignoreEnvFile,
          isGlobal: true,
          expandVariables: true,
          skipProcessEnv: true,
          load: [appConfig, dbConfig, jwtConfig, rabbitmqConfig, redisConfig],
          validationOptions: {
            allowUnknown: false,
            abortEarly: false,
          },
          validate: (config) => Environment.validate(config),
        }),
      ],
      providers: [FitConfigService],
      exports: [FitConfigService],
    };
  }
}
