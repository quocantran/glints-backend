"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notification_schema_1 = require("./schemas/notification.schema");
const app_gateway_1 = require("../gatewaies/app.gateway");
const users_service_1 = require("../users/users.service");
const companies_service_1 = require("../companies/companies.service");
let NotificationsService = class NotificationsService {
    constructor(notificationModel, appGateway, userService, companyService) {
        this.notificationModel = notificationModel;
        this.appGateway = appGateway;
        this.userService = userService;
        this.companyService = companyService;
    }
    async create(createNotificationDto) {
        const company = await this.companyService.findOne(createNotificationDto.senderId);
        await Promise.all(company.usersFollow.map(async (userId) => {
            const newNotifi = Object.assign(Object.assign({}, createNotificationDto), { receiverId: userId });
            await this.notificationModel.create(newNotifi);
        }));
    }
    async findAll(body, user) {
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
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [Object, app_gateway_1.AppGateway,
        users_service_1.UsersService,
        companies_service_1.CompaniesService])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map