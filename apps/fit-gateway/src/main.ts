import { NestFactory } from '@nestjs/core';
import { FitGatewayModule } from './fit-gateway.module';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { FitConfigService } from '@fit/shared';
import { Logger, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap', { timestamp: true });

  process.on('unhandledRejection', (reason: unknown) => {
    reason = !(reason instanceof Error)
      ? reason
      : { name: reason.name, message: reason.message, stack: reason.stack };
    logger.error('Unhandled rejection at bootstrap', reason);
  });

  const app = await NestFactory.create(FitGatewayModule, {
    logger,
    cors: true,
    bodyParser: true,
    rawBody: true,
  });
  const config = app.get(FitConfigService);

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      ...config.rabbitmq,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.enableShutdownHooks();
  useContainer(app.select(FitGatewayModule), { fallbackOnErrors: true });
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*',
  });
  app.setGlobalPrefix(config.app.prefix, { exclude: ['/'] });

  if (config.isSwaggerEnabled) {
    const { swagger } = config.app;
    const options = new DocumentBuilder()
      .setTitle(swagger.title)
      .setDescription(swagger.description)
      .setVersion(swagger.version)
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swagger.path, app, document, { explorer: true });
    logger.log(`Swagger initialized on path: ${swagger.path}`);
  }

  await Promise.all([
    app.startAllMicroservices(),
    app.listen(config.app.port, () =>
      logger.log(`${config.app.name} listen ${config.app.port}`),
    ),
  ]);
}

void bootstrap();
