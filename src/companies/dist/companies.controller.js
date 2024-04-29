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
exports.CompaniesController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("src/decorator/customize");
var CompaniesController = /** @class */ (function () {
    function CompaniesController(companiesService) {
        this.companiesService = companiesService;
    }
    CompaniesController.prototype.create = function (createCompanyDto, user) {
        return this.companiesService.create(createCompanyDto, user);
    };
    CompaniesController.prototype.findAll = function (query) {
        return this.companiesService.findAll(query);
    };
    CompaniesController.prototype.findOne = function (id) {
        return this.companiesService.findOne(id);
    };
    CompaniesController.prototype.update = function (id, updateCompanyDto, user) {
        return this.companiesService.update(id, updateCompanyDto, user);
    };
    CompaniesController.prototype.remove = function (id, user) {
        return this.companiesService.remove(id, user);
    };
    CompaniesController.prototype.countCompanies = function () {
        return this.companiesService.countCompanies();
    };
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Post(),
        __param(0, common_1.Body()), __param(1, customize_1.User())
    ], CompaniesController.prototype, "create");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], CompaniesController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], CompaniesController.prototype, "findOne");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body()),
        __param(2, customize_1.User())
    ], CompaniesController.prototype, "update");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id')), __param(1, customize_1.User())
    ], CompaniesController.prototype, "remove");
    __decorate([
        common_1.Get('/record/count')
    ], CompaniesController.prototype, "countCompanies");
    CompaniesController = __decorate([
        common_1.Controller('companies')
    ], CompaniesController);
    return CompaniesController;
}());
exports.CompaniesController = CompaniesController;
