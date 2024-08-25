import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { AppGateway } from 'src/gatewaies/app.gateway';
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from 'src/companies/companies.service';
import { IUser } from 'src/users/users.interface';
import { GetNotificationDto } from './dto/get-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: SoftDeleteModel<NotificationDocument>,
    private readonly appGateway: AppGateway,
    private readonly userService: UsersService,
    private readonly companyService: CompaniesService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const company = await this.companyService.findOne(
      createNotificationDto.senderId,
    );

    await Promise.all(
      company.usersFollow.map(async (userId) => {
        const newNotifi = {
          ...createNotificationDto,
          receiverId: userId,
        };

        await this.notificationModel.create(newNotifi);
      }),
    );
  }

  async findAll(body: GetNotificationDto, user: IUser) {
    const { current, pageSize } = body;

    const totalRecord = await this.notificationModel
      .find({ receiverId: user._id })
      .countDocuments();

    const limit = pageSize ? pageSize : 50;

    const totalPage = Math.ceil(totalRecord / limit);

    const skip = (current - 1) * limit;

    const notifications = await this.notificationModel
      .find({ receiverId: user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      meta: {
        current: current,
        pageSize: limit,
        pages: totalPage,
        total: totalRecord,
      },
      result: notifications,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
