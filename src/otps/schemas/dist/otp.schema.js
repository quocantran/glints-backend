"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OtpSchema = exports.Otp = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Otp = /** @class */ (function () {
    function Otp() {
    }
    __decorate([
        mongoose_1.Prop()
    ], Otp.prototype, "email");
    __decorate([
        mongoose_1.Prop()
    ], Otp.prototype, "token");
    __decorate([
        mongoose_1.Prop()
    ], Otp.prototype, "isActive");
    __decorate([
        mongoose_1.Prop()
    ], Otp.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], Otp.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Otp.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Otp.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Date, "default": Date.now, expires: 600 })
    ], Otp.prototype, "expiredAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Otp.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Otp.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Otp.prototype, "deletedBy");
    Otp = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Otp);
    return Otp;
}());
exports.Otp = Otp;
exports.OtpSchema = mongoose_1.SchemaFactory.createForClass(Otp);
