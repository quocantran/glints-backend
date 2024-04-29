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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("src/decorator/customize");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.create = function (registerUserDto) {
        return this.usersService.create(registerUserDto);
    };
    UsersController.prototype.findAll = function (qs) {
        return this.usersService.findAll(qs);
    };
    UsersController.prototype.findOne = function (id) {
        return this.usersService.findOne(id);
    };
    UsersController.prototype.update = function (id, updateUserDto, user) {
        return this.usersService.update(id, updateUserDto, user);
    };
    UsersController.prototype.remove = function (id) {
        return this.usersService.remove(id);
    };
    UsersController.prototype.updatePassword = function (id, updateUserDto) {
        return this.usersService.updatePassword(id, updateUserDto);
    };
    UsersController.prototype.forgotPassword = function (forgotPasswordDto) {
        return this.usersService.forgotPassword(forgotPasswordDto);
    };
    UsersController.prototype.countUser = function () {
        return this.usersService.countUser();
    };
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Post(),
        __param(0, common_1.Body())
    ], UsersController.prototype, "create");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], UsersController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "findOne");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body()),
        __param(2, customize_1.User())
    ], UsersController.prototype, "update");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "remove");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Patch(':id/password'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body())
    ], UsersController.prototype, "updatePassword");
    __decorate([
        common_1.Post('/password/forgot'),
        __param(0, common_1.Body())
    ], UsersController.prototype, "forgotPassword");
    __decorate([
        common_1.Get('/record/count')
    ], UsersController.prototype, "countUser");
    UsersController = __decorate([
        common_1.Controller('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
