"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ForgotPasswordSchema = exports.ForgotPassword = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var ForgotPassword = /** @class */ (function () {
    function ForgotPassword() {
    }
    __decorate([
        mongoose_1.Prop()
    ], ForgotPassword.prototype, "email");
    __decorate([
        mongoose_1.Prop()
    ], ForgotPassword.prototype, "otp");
    __decorate([
        mongoose_1.Prop({
            "default": 0
        })
    ], ForgotPassword.prototype, "expiredAt");
    ForgotPassword = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], ForgotPassword);
    return ForgotPassword;
}());
exports.ForgotPassword = ForgotPassword;
exports.ForgotPasswordSchema = mongoose_1.SchemaFactory.createForClass(ForgotPassword);
