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
exports.ForgotPasswordController = void 0;
const common_1 = require("@nestjs/common");
const forgot_password_service_1 = require("./forgot-password.service");
const create_forgot_password_dto_1 = require("./dto/create-forgot-password.dto");
let ForgotPasswordController = class ForgotPasswordController {
    constructor(forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }
    create(createForgotPasswordDto) {
        return this.forgotPasswordService.create(createForgotPasswordDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forgot_password_dto_1.CreateForgotPasswordDto]),
    __metadata("design:returntype", void 0)
], ForgotPasswordController.prototype, "create", null);
ForgotPasswordController = __decorate([
    (0, common_1.Controller)('forgot-password'),
    __metadata("design:paramtypes", [forgot_password_service_1.ForgotPasswordService])
], ForgotPasswordController);
exports.ForgotPasswordController = ForgotPasswordController;
//# sourceMappingURL=forgot-password.controller.js.map