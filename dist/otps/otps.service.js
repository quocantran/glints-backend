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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const otp_schema_1 = require("./schemas/otp.schema");
const users_service_1 = require("../users/users.service");
const crypto_1 = __importDefault(require("crypto"));
const mail_service_1 = require("../mail/mail.service");
let OtpsService = class OtpsService {
    constructor(otpModel, userService, mailService) {
        this.otpModel = otpModel;
        this.userService = userService;
        this.mailService = mailService;
    }
    async create(createOtpDto) {
        const isExist = await this.userService.findUserByUsername(createOtpDto.email);
        if (!isExist) {
            throw new common_1.BadRequestException('User not found');
        }
        const existOtp = await this.otpModel.findOne({ email: createOtpDto.email });
        if (existOtp) {
            throw new common_1.BadRequestException('Otp already exist');
        }
        const otpToken = this.genarateToken();
        const newOtp = {
            token: otpToken,
            email: createOtpDto.email
        };
        await this.mailService.sendMail(createOtpDto.email, otpToken.toString());
        const result = await this.otpModel.create(newOtp);
        return result;
    }
    genarateToken() {
        const token = crypto_1.default.randomInt(0, Math.pow(2, 32));
        return token;
    }
    async checkToken(token) {
        const otp = this.otpModel.findOne({ token: token }).lean().exec();
        if (!otp) {
            throw new common_1.BadRequestException('Token not found');
        }
        return otp;
    }
    async remove(token) {
        await this.otpModel.deleteOne({ token: token });
    }
};
OtpsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        mail_service_1.MailService])
], OtpsService);
exports.OtpsService = OtpsService;
//# sourceMappingURL=otps.service.js.map