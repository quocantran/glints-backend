"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResumesModule = void 0;
var common_1 = require("@nestjs/common");
var resumes_service_1 = require("./resumes.service");
var resumes_controller_1 = require("./resumes.controller");
var resume_schema_1 = require("./schemas/resume.schema");
var mongoose_1 = require("@nestjs/mongoose");
var roles_module_1 = require("src/roles/roles.module");
var users_module_1 = require("src/users/users.module");
var ResumesModule = /** @class */ (function () {
    function ResumesModule() {
    }
    ResumesModule_1 = ResumesModule;
    var ResumesModule_1;
    ResumesModule = ResumesModule_1 = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: resume_schema_1.Resume.name, schema: resume_schema_1.ResumeSchema }]),
                roles_module_1.RolesModule,
                users_module_1.UsersModule,
            ],
            controllers: [resumes_controller_1.ResumesController],
            providers: [resumes_service_1.ResumesService],
            exports: [resumes_service_1.ResumesService, ResumesModule_1]
        })
    ], ResumesModule);
    return ResumesModule;
}());
exports.ResumesModule = ResumesModule;
