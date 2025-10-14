export interface IEnvironment {
  NODE_ENV: string;
  APP_NAME: string;
  APP_VERSION: string;
  PORT: number;
  GLOBAL_PREFIX: string;
  SWAGGER_ENABLED: boolean;

  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;

  JWT_SECRET_AT: string;
  JWT_SECRET_RT: string;
  JWT_EXPIRATION_AT: string;
  JWT_EXPIRATION_RT: string;

  RABBITMQ_URLS: string;
  RABBITMQ_QUEUE: string;
}
