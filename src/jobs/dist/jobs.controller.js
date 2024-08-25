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
exports.JobsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("src/decorator/customize");
var JobsController = /** @class */ (function () {
    function JobsController(jobsService) {
        this.jobsService = jobsService;
    }
    JobsController.prototype.create = function (createJobDto, user) {
        return this.jobsService.create(createJobDto, user);
    };
    JobsController.prototype.findAll = function (qs) {
        return this.jobsService.findAll(qs);
    };
    JobsController.prototype.findOne = function (id) {
        return this.jobsService.findOne(id);
    };
    JobsController.prototype.update = function (id, updateJobDto, user) {
        return this.jobsService.update(id, updateJobDto, user);
    };
    JobsController.prototype.remove = function (id) {
        return this.jobsService.remove(id);
    };
    JobsController.prototype.search = function (searhJobDto) {
        return this.jobsService.search(searhJobDto);
    };
    JobsController.prototype.countJobs = function () {
        return this.jobsService.countJobs();
    };
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Post(),
        __param(0, common_1.Body()), __param(1, customize_1.User())
    ], JobsController.prototype, "create");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], JobsController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], JobsController.prototype, "findOne");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body()),
        __param(2, customize_1.User())
    ], JobsController.prototype, "update");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], JobsController.prototype, "remove");
    __decorate([
        common_1.Get('/search/suggest'),
        __param(0, common_1.Query())
    ], JobsController.prototype, "search");
    __decorate([
        common_1.Get('/record/count')
    ], JobsController.prototype, "countJobs");
    JobsController = __decorate([
        common_1.Controller('jobs')
    ], JobsController);
    return JobsController;
}());
exports.JobsController = JobsController;
