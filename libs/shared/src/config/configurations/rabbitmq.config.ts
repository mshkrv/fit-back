import { registerAs } from '@nestjs/config';
import { isString } from 'class-validator';

export const rabbitmqConfig = registerAs('rabbitmq', () => ({
  urls: isString(process.env.RABBITMQ_URLS)
    ? process.env.RABBITMQ_URLS.split(', ').map((url) => url.trim())
    : [],
  queue: process.env.RABBITMQ_QUEUE,
}));
