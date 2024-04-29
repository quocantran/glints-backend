"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ForgotPasswordController = void 0;
var common_1 = require("@nestjs/common");
var ForgotPasswordController = /** @class */ (function () {
    function ForgotPasswordController(forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }
    ForgotPasswordController.prototype.create = function (createForgotPasswordDto) {
        return this.forgotPasswordService.create(createForgotPasswordDto);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], ForgotPasswordController.prototype, "create");
    ForgotPasswordController = __decorate([
        common_1.Controller('forgot-password')
    ], ForgotPasswordController);
    return ForgotPasswordController;
}());
exports.ForgotPasswordController = ForgotPasswordController;
