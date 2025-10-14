import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('database', () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  url: process.env.POSTGRES_URL,
}));
