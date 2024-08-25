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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const notifications_service_1 = require("./notifications.service");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const update_notification_dto_1 = require("./dto/update-notification.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const customize_1 = require("../decorator/customize");
const get_notification_dto_1 = require("./dto/get-notification.dto");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    create(createNotificationDto, context) {
        return this.notificationsService.create(createNotificationDto);
    }
    findNotificationsByUser(body, user) {
        return this.notificationsService.findAll(body, user);
    }
    findOne(id) {
        return this.notificationsService.findOne(id);
    }
    update(updateNotificationDto) {
        return this.notificationsService.update(updateNotificationDto.id, updateNotificationDto);
    }
    remove(id) {
        return this.notificationsService.remove(id);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('job_created'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto,
        microservices_1.RmqContext]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_notification_dto_1.GetNotificationDto, Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findNotificationsByUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneNotification'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateNotification'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_notification_dto_1.UpdateNotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeNotification'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "remove", null);
NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map