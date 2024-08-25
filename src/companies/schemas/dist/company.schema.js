"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanySchema = exports.Company = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "name");
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "description");
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "address");
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop({ type: [{ type: mongoose_2["default"].Schema.Types.ObjectId, ref: 'User' }] })
    ], Company.prototype, "usersFollow");
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "logo");
    __decorate([
        mongoose_1.Prop()
    ], Company.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Company.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Company.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Company.prototype, "deletedBy");
    Company = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Company);
    return Company;
}());
exports.Company = Company;
exports.CompanySchema = mongoose_1.SchemaFactory.createForClass(Company);
