"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResumesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumesModule = void 0;
const common_1 = require("@nestjs/common");
const resumes_service_1 = require("./resumes.service");
const resumes_controller_1 = require("./resumes.controller");
const resume_schema_1 = require("./schemas/resume.schema");
const mongoose_1 = require("@nestjs/mongoose");
const roles_module_1 = require("../roles/roles.module");
const users_module_1 = require("../users/users.module");
let ResumesModule = ResumesModule_1 = class ResumesModule {
};
ResumesModule = ResumesModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: resume_schema_1.Resume.name, schema: resume_schema_1.ResumeSchema }]),
            roles_module_1.RolesModule,
            users_module_1.UsersModule,
        ],
        controllers: [resumes_controller_1.ResumesController],
        providers: [resumes_service_1.ResumesService],
        exports: [resumes_service_1.ResumesService, ResumesModule_1],
    })
], ResumesModule);
exports.ResumesModule = ResumesModule;
//# sourceMappingURL=resumes.module.js.map