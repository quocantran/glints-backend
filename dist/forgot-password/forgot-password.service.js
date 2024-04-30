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
exports.ForgotPasswordService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const forgot_password_schema_1 = require("./schemas/forgot-password.schema");
const mail_service_1 = require("../mail/mail.service");
let ForgotPasswordService = class ForgotPasswordService {
    constructor(forgotPasswordModel, mailService) {
        this.forgotPasswordModel = forgotPasswordModel;
        this.mailService = mailService;
    }
    async create(createForgotPasswordDto) {
        const isExist = await this.forgotPasswordModel.findOne({
            email: createForgotPasswordDto.email,
        });
        if (isExist) {
            throw new common_1.ForbiddenException('Vui lòng đợi 3 phút trước khi gửi lại mã OTP');
        }
        const forgotPassword = await this.forgotPasswordModel.create(createForgotPasswordDto);
        await this.mailService.sendMail(createForgotPasswordDto.email, createForgotPasswordDto.otp);
        return forgotPassword;
    }
};
ForgotPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(forgot_password_schema_1.ForgotPassword.name)),
    __metadata("design:paramtypes", [Object, mail_service_1.MailService])
], ForgotPasswordService);
exports.ForgotPasswordService = ForgotPasswordService;
//# sourceMappingURL=forgot-password.service.js.map