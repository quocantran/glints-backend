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
exports.ForgotPasswordSchema = exports.ForgotPassword = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ForgotPassword = class ForgotPassword {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ForgotPassword.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ForgotPassword.prototype, "otp", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Date)
], ForgotPassword.prototype, "expiredAt", void 0);
ForgotPassword = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ForgotPassword);
exports.ForgotPassword = ForgotPassword;
exports.ForgotPasswordSchema = mongoose_1.SchemaFactory.createForClass(ForgotPassword);
//# sourceMappingURL=forgot-password.schema.js.map