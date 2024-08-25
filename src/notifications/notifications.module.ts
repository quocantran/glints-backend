import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './schemas/notification.schema';
import { GatewaiesModule } from 'src/gatewaies/gatewaies.module';
import { UsersModule } from 'src/users/users.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),

    GatewaiesModule,
    UsersModule,
    CompaniesModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
