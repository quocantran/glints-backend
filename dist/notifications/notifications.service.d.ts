/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { AppGateway } from 'src/gatewaies/app.gateway';
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from 'src/companies/companies.service';
import { IUser } from 'src/users/users.interface';
import { GetNotificationDto } from './dto/get-notification.dto';
export declare class NotificationsService {
    private readonly notificationModel;
    private readonly appGateway;
    private readonly userService;
    private readonly companyService;
    constructor(notificationModel: SoftDeleteModel<NotificationDocument>, appGateway: AppGateway, userService: UsersService, companyService: CompaniesService);
    create(createNotificationDto: CreateNotificationDto): Promise<void>;
    findAll(body: GetNotificationDto, user: IUser): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification> & Notification & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Notification> & Notification & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    findOne(id: number): string;
    update(id: number, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: number): string;
}
