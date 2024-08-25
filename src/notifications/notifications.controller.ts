import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { GetNotificationDto } from './dto/get-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('job_created')
  create(
    @Payload() createNotificationDto: CreateNotificationDto,
    @Ctx() context: RmqContext,
  ) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  findNotificationsByUser(
    @Body() body: GetNotificationDto,
    @User() user: IUser,
  ) {
    return this.notificationsService.findAll(body, user);
  }

  @MessagePattern('findOneNotification')
  findOne(@Payload() id: number) {
    return this.notificationsService.findOne(id);
  }

  @MessagePattern('updateNotification')
  update(@Payload() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @MessagePattern('removeNotification')
  remove(@Payload() id: number) {
    return this.notificationsService.remove(id);
  }
}
