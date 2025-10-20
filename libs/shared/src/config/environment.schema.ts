import { EnvironmentEnum } from '../enum';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class Environment {
  @IsEnum(EnvironmentEnum)
  @IsDefined()
  NODE_ENV!: EnvironmentEnum;

  @IsString()
  @MinLength(1)
  APP_NAME?: string;

  @IsString()
  @Matches(/^\d+\.\d+\.\d+$/)
  APP_VERSION?: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsDefined()
  PORT!: number;

  @IsString()
  @MinLength(1)
  GLOBAL_PREFIX?: string;

  @IsBoolean()
  SWAGGER_ENABLED?: boolean;

  @IsString()
  @MinLength(1)
  @IsDefined()
  POSTGRES_HOST!: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsDefined()
  POSTGRES_PORT!: number;

  @IsString()
  @MinLength(1)
  @IsDefined()
  POSTGRES_DB!: string;

  @IsString()
  @MinLength(1)
  @IsDefined()
  POSTGRES_USER!: string;

  @IsString()
  @MinLength(1)
  @IsDefined()
  POSTGRES_PASSWORD!: string;

  @IsString()
  @MinLength(1)
  POSTGRES_URL?: string;

  @IsString()
  @MinLength(32)
  @IsDefined()
  JWT_SECRET_AT!: string;

  @IsString()
  @MinLength(32)
  @IsDefined()
  JWT_SECRET_RT!: string;

  @IsString()
  @MinLength(1)
  @IsDefined()
  JWT_EXPIRATION_AT!: string;

  @IsString()
  @MinLength(1)
  @IsDefined()
  JWT_EXPIRATION_RT!: string;

  @IsString()
  @MinLength(1)
  JWT_ISSUER!: string;

  @IsString()
  @MinLength(1)
  @IsDefined()
  RABBITMQ_URLS!: string;

  @IsString()
  @MinLength(1)
  RABBITMQ_QUEUE!: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsDefined()
  REDIS_PORT!: number;

  @IsString()
  @MinLength(1)
  @IsDefined()
  REDIS_HOST!: string;

  @IsString()
  @MinLength(1)
  @IsDefined()
  REDIS_PASSWORD!: string;

  static validate(config: Record<string, unknown>): Environment {
    const validatedConfig = plainToInstance(Environment, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      enableDebugMessages: true,
      skipMissingProperties: true,
    });

    if (errors.length > 0) {
      const errMessages = errors
        .map((err) => Object.values(err.constraints || {}).join(', '))
        .join('; ');

      throw new Error(`Config validation error: ${errMessages}`);
    }

    this.validateRabbitUrls(validatedConfig.RABBITMQ_URLS);

    return validatedConfig;
  }

  private static validateRabbitUrls(urls: string): void {
    if (!urls) {
      throw new Error('RABBITMQ_URLS is required');
    }

    const parsedUrls = urls.split(',');

    if (parsedUrls.length === 0) {
      throw new Error('RABBITMQ_URLS must contain at least one URL');
    }
  }
}
