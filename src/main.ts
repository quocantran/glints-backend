import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import { join } from 'path';
import helmet from 'helmet';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as amqp from 'amqplib';

async function bootstrapHttpServer() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(serveStatic(join(__dirname, '..', 'public')));

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2'],
  });

  app.use(helmet());

  app.useWebSocketAdapter(new IoAdapter(app));

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  const PORT = configService.get<string>('PORT');
  await app.listen(PORT);
}

async function setupRabbitMQ() {
  const connection = await amqp.connect(process.env.RMQ_URL as string);
  const channel = await connection.createChannel();

  const listQueue = [
    process.env.NOTI_QUEUE as string,
    process.env.ELASTIC_QUEUE as string,
  ];

  const exchangeName = process.env.EXCHANGE_NAME as string;
  const exchangeDLX = process.env.EXCHANGE_DLX as string;
  const exchangeDLXRoutingKey = process.env.ROUTING_KEY_DLX as string;

  await channel.assertExchange(exchangeName, 'direct', { durable: true });

  await Promise.all(
    listQueue.map(async (queue) => {
      await channel.assertQueue(queue, {
        durable: true,
        exclusive: false,
        arguments: {
          'x-dead-letter-exchange': exchangeDLX,
          'x-dead-letter-routing-key': exchangeDLXRoutingKey,
          'x-message-ttl': 4000,
        },
      });
      await channel.bindQueue(queue, exchangeName, exchangeDLXRoutingKey);
    }),
  );

  await channel.close();
  await connection.close();
}

async function elasticQueue() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL as string],
        queue: process.env.ELASTIC_QUEUE as string,
        noAck: false,
        queueOptions: {
          durable: true,
          deadLetterExchange: process.env.EXCHANGE_DLX as string,
          deadLetterRoutingKey: process.env.ROUTING_KEY_DLX as string,
          messageTtl: 4000,
        },
      },
    },
  );

  await app.listen();
}

async function notiQueue() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,

      options: {
        urls: [process.env.RMQ_URL as string],
        queue: process.env.NOTI_QUEUE as string,
        noAck: false,
        queueOptions: {
          durable: true,
          deadLetterExchange: process.env.EXCHANGE_DLX as string,
          deadLetterRoutingKey: process.env.ROUTING_KEY_DLX as string,
          messageTtl: 4000,
        },
      },
    },
  );

  await app.listen();
}

async function bootstrap() {
  await bootstrapHttpServer();
  await setupRabbitMQ();
  await notiQueue();
  await elasticQueue();
}
bootstrap();
