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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = exports.Notification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Notification = class Notification {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "senderId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "receiverId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Notification.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Notification.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Notification.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Notification.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Notification.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Notification.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Notification.prototype, "deletedBy", void 0);
Notification = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Notification);
exports.Notification = Notification;
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
//# sourceMappingURL=notification.schema.js.map