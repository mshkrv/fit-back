import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  port: process.env.PORT,
  prefix: process.env.GLOBAL_PREFIX,
  swagger: {
    enabled: process.env.SWAGGER_ENABLED,
    title: process.env.APP_NAME,
    description: `${process.env.APP_NAME} API documentation`,
    version: process.env.APP_VERSION,
    path: 'api/docs',
  },
}));
