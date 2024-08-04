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
exports.SkillsController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("src/decorator/customize");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var SkillsController = /** @class */ (function () {
    function SkillsController(skillsService) {
        this.skillsService = skillsService;
    }
    SkillsController.prototype.create = function (createSkillDto, user) {
        return this.skillsService.create(createSkillDto, user);
    };
    SkillsController.prototype.findAll = function (qs) {
        return this.skillsService.findAll(qs);
    };
    SkillsController.prototype.findOne = function (id) {
        return this.skillsService.findOne(id);
    };
    SkillsController.prototype.update = function (id, updateSkillDto, user) {
        return this.skillsService.update(id, updateSkillDto, user);
    };
    SkillsController.prototype.remove = function (id) {
        return this.skillsService.remove(id);
    };
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body()), __param(1, customize_1.User())
    ], SkillsController.prototype, "create");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], SkillsController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], SkillsController.prototype, "findOne");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, customize_1.User())
    ], SkillsController.prototype, "update");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], SkillsController.prototype, "remove");
    SkillsController = __decorate([
        common_1.Controller('skills')
    ], SkillsController);
    return SkillsController;
}());
exports.SkillsController = SkillsController;
