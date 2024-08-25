import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
