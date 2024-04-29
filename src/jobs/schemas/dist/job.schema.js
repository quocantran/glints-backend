"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobSchema = exports.Job = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Job = /** @class */ (function () {
    function Job() {
    }
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "name");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "description");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "skills");
    __decorate([
        mongoose_1.Prop({
            type: Object,
            ref: 'Company'
        })
    ], Job.prototype, "company");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "salary");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "level");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "startDate");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "quantity");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "location");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "endDate");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "isActive");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Job.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Job.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Job.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Job.prototype, "deletedBy");
    Job = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Job);
    return Job;
}());
exports.Job = Job;
exports.JobSchema = mongoose_1.SchemaFactory.createForClass(Job);
