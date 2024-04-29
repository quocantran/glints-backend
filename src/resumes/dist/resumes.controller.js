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
exports.ResumesController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("src/decorator/customize");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var ResumesController = /** @class */ (function () {
    function ResumesController(resumesService) {
        this.resumesService = resumesService;
    }
    ResumesController.prototype.create = function (createResumeDto, user) {
        return this.resumesService.create(createResumeDto, user);
    };
    ResumesController.prototype.findAll = function (qs, user) {
        return this.resumesService.findAll(qs, user);
    };
    ResumesController.prototype.findOne = function (id) {
        return this.resumesService.findOne(id);
    };
    ResumesController.prototype.update = function (id, updateResumeDto, user) {
        return this.resumesService.update(id, updateResumeDto, user);
    };
    ResumesController.prototype.remove = function (id) {
        return this.resumesService.remove(id);
    };
    ResumesController.prototype.findByUser = function (user) {
        return this.resumesService.findByUser(user);
    };
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Post(),
        __param(0, common_1.Body()), __param(1, customize_1.User())
    ], ResumesController.prototype, "create");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Get(),
        __param(0, common_1.Query()), __param(1, customize_1.User())
    ], ResumesController.prototype, "findAll");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], ResumesController.prototype, "findOne");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body()),
        __param(2, customize_1.User())
    ], ResumesController.prototype, "update");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], ResumesController.prototype, "remove");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Post('by-user'),
        __param(0, customize_1.User())
    ], ResumesController.prototype, "findByUser");
    ResumesController = __decorate([
        common_1.Controller('resumes')
    ], ResumesController);
    return ResumesController;
}());
exports.ResumesController = ResumesController;
