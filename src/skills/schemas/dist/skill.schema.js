"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SkillSchema = exports.Skill = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Skill = /** @class */ (function () {
    function Skill() {
    }
    __decorate([
        mongoose_1.Prop()
    ], Skill.prototype, "name");
    __decorate([
        mongoose_1.Prop()
    ], Skill.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], Skill.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Skill.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Skill.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Skill.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Skill.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Skill.prototype, "deletedBy");
    Skill = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Skill);
    return Skill;
}());
exports.Skill = Skill;
exports.SkillSchema = mongoose_1.SchemaFactory.createForClass(Skill);
