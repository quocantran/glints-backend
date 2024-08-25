"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationSchema = exports.Notification = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Notification = /** @class */ (function () {
    function Notification() {
    }
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "senderId");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "type");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "content");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "receiverId");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Notification.prototype, "options");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "isActive");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Notification.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Notification.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Notification.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Notification.prototype, "deletedBy");
    Notification = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
