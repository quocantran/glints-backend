"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationsModule = void 0;
var common_1 = require("@nestjs/common");
var notifications_service_1 = require("./notifications.service");
var notifications_controller_1 = require("./notifications.controller");
var mongoose_1 = require("@nestjs/mongoose");
var notification_schema_1 = require("./schemas/notification.schema");
var gatewaies_module_1 = require("src/gatewaies/gatewaies.module");
var users_module_1 = require("src/users/users.module");
var companies_module_1 = require("src/companies/companies.module");
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
    }
    NotificationsModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: 'Notification', schema: notification_schema_1.NotificationSchema },
                ]),
                gatewaies_module_1.GatewaiesModule,
                users_module_1.UsersModule,
                companies_module_1.CompaniesModule,
            ],
            controllers: [notifications_controller_1.NotificationsController],
            providers: [notifications_service_1.NotificationsService]
        })
    ], NotificationsModule);
    return NotificationsModule;
}());
exports.NotificationsModule = NotificationsModule;
