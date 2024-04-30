"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ForgotPasswordModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordModule = void 0;
const common_1 = require("@nestjs/common");
const forgot_password_service_1 = require("./forgot-password.service");
const forgot_password_controller_1 = require("./forgot-password.controller");
const mongoose_1 = require("@nestjs/mongoose");
const forgot_password_schema_1 = require("./schemas/forgot-password.schema");
const mail_module_1 = require("../mail/mail.module");
let ForgotPasswordModule = ForgotPasswordModule_1 = class ForgotPasswordModule {
};
ForgotPasswordModule = ForgotPasswordModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: forgot_password_schema_1.ForgotPassword.name, schema: forgot_password_schema_1.ForgotPasswordSchema },
            ]),
            mail_module_1.MailModule,
        ],
        controllers: [forgot_password_controller_1.ForgotPasswordController],
        providers: [forgot_password_service_1.ForgotPasswordService],
        exports: [ForgotPasswordModule_1, forgot_password_service_1.ForgotPasswordService],
    })
], ForgotPasswordModule);
exports.ForgotPasswordModule = ForgotPasswordModule;
//# sourceMappingURL=forgot-password.module.js.map