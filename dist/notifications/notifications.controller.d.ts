import { RmqContext } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { IUser } from 'src/users/users.interface';
import { GetNotificationDto } from './dto/get-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto, context: RmqContext): Promise<void>;
    findNotificationsByUser(body: GetNotificationDto, user: IUser): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/notification.schema").Notification> & import("./schemas/notification.schema").Notification & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./schemas/notification.schema").Notification> & import("./schemas/notification.schema").Notification & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    findOne(id: number): string;
    update(updateNotificationDto: UpdateNotificationDto): string;
    remove(id: number): string;
}
