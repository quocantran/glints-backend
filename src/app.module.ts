import { CacheStore, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';
import { FilesModule } from './files/files.module';
import { ResumesModule } from './resumes/resumes.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './mail/mail.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SkillsModule } from './skills/skills.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OtpsModule } from './otps/otps.module';
import { GatewaiesModule } from './gatewaies/gatewaies.module';
import { ChatsModule } from './chats/chats.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ElasticsearchsModule } from './elasticsearchs/elasticsearchs.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    UsersModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        },
      }),

      inject: [ConfigService],
    }),

    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore as unknown as CacheStore,
        ttl: 60 * 1000,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //config limits rate
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    AuthModule,
    CompaniesModule,
    JobsModule,
    FilesModule,
    ResumesModule,
    PermissionsModule,
    RolesModule,
    MailModule,
    OtpsModule,
    SubscribersModule,
    SkillsModule,
    OtpsModule,
    GatewaiesModule,
    ChatsModule,
    NotificationsModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost'],
          queue: 'noti-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ElasticsearchsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
