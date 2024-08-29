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
    origin: ['https://glints-app-clone.vercel.app', 'http://localhost:3000'],
    credentials: true,
  });
  const PORT = configService.get<string>('PORT');
  await app.listen(PORT);
}

async function bootstrapMicroservice() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,

      options: {
        urls: [process.env.RMQ_URL as string],
        queue: 'noti-queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}

async function bootstrap() {
  await bootstrapHttpServer();
  await bootstrapMicroservice();
}
bootstrap();
