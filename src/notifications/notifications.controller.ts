import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notifications Controller')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('job_created')
  async create(
    @Payload() createNotificationDto: CreateNotificationDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      return await this.notificationsService.create(createNotificationDto);
    } catch (err) {
      Logger.error('Error::::::', err);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.nack(originalMsg, false, false);
    }
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  findNotificationsByUser(
    @Body() body: GetNotificationDto,
    @User() user: IUser,
  ) {
    return this.notificationsService.findAll(body, user);
  }
}
