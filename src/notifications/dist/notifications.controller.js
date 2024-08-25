"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.NotificationsController = void 0;
var common_1 = require("@nestjs/common");
var microservices_1 = require("@nestjs/microservices");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("src/decorator/customize");
var NotificationsController = /** @class */ (function () {
    function NotificationsController(notificationsService) {
        this.notificationsService = notificationsService;
    }
    NotificationsController.prototype.create = function (createNotificationDto, context) {
        return this.notificationsService.create(createNotificationDto);
    };
    NotificationsController.prototype.findNotificationsByUser = function (body, user) {
        return this.notificationsService.findAll(body, user);
    };
    NotificationsController.prototype.findOne = function (id) {
        return this.notificationsService.findOne(id);
    };
    NotificationsController.prototype.update = function (updateNotificationDto) {
        return this.notificationsService.update(updateNotificationDto.id, updateNotificationDto);
    };
    NotificationsController.prototype.remove = function (id) {
        return this.notificationsService.remove(id);
    };
    __decorate([
        microservices_1.MessagePattern('job_created'),
        __param(0, microservices_1.Payload()),
        __param(1, microservices_1.Ctx())
    ], NotificationsController.prototype, "create");
    __decorate([
        common_1.Post(''),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body()),
        __param(1, customize_1.User())
    ], NotificationsController.prototype, "findNotificationsByUser");
    __decorate([
        microservices_1.MessagePattern('findOneNotification'),
        __param(0, microservices_1.Payload())
    ], NotificationsController.prototype, "findOne");
    __decorate([
        microservices_1.MessagePattern('updateNotification'),
        __param(0, microservices_1.Payload())
    ], NotificationsController.prototype, "update");
    __decorate([
        microservices_1.MessagePattern('removeNotification'),
        __param(0, microservices_1.Payload())
    ], NotificationsController.prototype, "remove");
    NotificationsController = __decorate([
        common_1.Controller('notifications')
    ], NotificationsController);
    return NotificationsController;
}());
exports.NotificationsController = NotificationsController;
