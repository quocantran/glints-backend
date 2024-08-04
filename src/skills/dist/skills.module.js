"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SkillsModule = void 0;
var common_1 = require("@nestjs/common");
var skills_service_1 = require("./skills.service");
var skills_controller_1 = require("./skills.controller");
var mongoose_1 = require("@nestjs/mongoose");
var skill_schema_1 = require("./schemas/skill.schema");
var SkillsModule = /** @class */ (function () {
    function SkillsModule() {
    }
    SkillsModule_1 = SkillsModule;
    var SkillsModule_1;
    SkillsModule = SkillsModule_1 = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: skill_schema_1.Skill.name, schema: skill_schema_1.SkillSchema },
                ])
            ],
            controllers: [skills_controller_1.SkillsController],
            providers: [skills_service_1.SkillsService],
            exports: [skills_service_1.SkillsService, SkillsModule_1]
        })
    ], SkillsModule);
    return SkillsModule;
}());
exports.SkillsModule = SkillsModule;
