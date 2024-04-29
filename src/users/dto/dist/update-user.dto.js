"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateUserPasswordDto = exports.UpdateUserDto = void 0;
var class_validator_1 = require("class-validator");
var mongoose_1 = require("@nestjs/mongoose");
var class_transformer_1 = require("class-transformer");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        class_validator_1.IsOptional()
    ], Company.prototype, "_id");
    __decorate([
        class_validator_1.IsOptional()
    ], Company.prototype, "name");
    return Company;
}());
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEmail({}, { message: 'Invalid email format' })
    ], UpdateUserDto.prototype, "email");
    __decorate([
        class_validator_1.IsOptional(),
        mongoose_1.Prop()
    ], UpdateUserDto.prototype, "role");
    __decorate([
        class_validator_1.IsOptional(),
        mongoose_1.Prop()
    ], UpdateUserDto.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        mongoose_1.Prop()
    ], UpdateUserDto.prototype, "age");
    __decorate([
        class_validator_1.IsOptional(),
        mongoose_1.Prop()
    ], UpdateUserDto.prototype, "gender");
    __decorate([
        class_validator_1.IsOptional(),
        mongoose_1.Prop()
    ], UpdateUserDto.prototype, "address");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsObject(),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return Company; })
    ], UpdateUserDto.prototype, "company");
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
var UpdateUserPasswordDto = /** @class */ (function () {
    function UpdateUserPasswordDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty()
    ], UpdateUserPasswordDto.prototype, "password");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], UpdateUserPasswordDto.prototype, "newPassword");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], UpdateUserPasswordDto.prototype, "repeatedPassword");
    return UpdateUserPasswordDto;
}());
exports.UpdateUserPasswordDto = UpdateUserPasswordDto;
