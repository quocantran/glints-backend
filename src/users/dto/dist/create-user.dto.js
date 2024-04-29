"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = exports.RegisterUserDto = exports.Company = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        class_validator_1.IsNotEmpty()
    ], Company.prototype, "_id");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], Company.prototype, "name");
    return Company;
}());
exports.Company = Company;
var RegisterUserDto = /** @class */ (function () {
    function RegisterUserDto() {
    }
    __decorate([
        class_validator_1.IsEmail({}, { message: 'Invalid email format' }),
        class_validator_1.IsNotEmpty({ message: 'Email cannot be empty' })
    ], RegisterUserDto.prototype, "email");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Password cannot be empty' })
    ], RegisterUserDto.prototype, "password");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'role cannot be empty' }),
        mongoose_1.Prop()
    ], RegisterUserDto.prototype, "role");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'name cannot be empty' }),
        mongoose_1.Prop()
    ], RegisterUserDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'age cannot be empty' }),
        mongoose_1.Prop()
    ], RegisterUserDto.prototype, "age");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'gender cannot be empty' }),
        mongoose_1.Prop()
    ], RegisterUserDto.prototype, "gender");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'address cannot be empty' }),
        mongoose_1.Prop()
    ], RegisterUserDto.prototype, "address");
    __decorate([
        class_validator_1.IsNotEmptyObject(),
        class_validator_1.IsObject(),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return Company; })
    ], RegisterUserDto.prototype, "company");
    return RegisterUserDto;
}());
exports.RegisterUserDto = RegisterUserDto;
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        class_validator_1.IsEmail({}, { message: 'Invalid email format' }),
        class_validator_1.IsNotEmpty({ message: 'Email cannot be empty' })
    ], CreateUserDto.prototype, "email");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Password cannot be empty' })
    ], CreateUserDto.prototype, "password");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'name cannot be empty' }),
        mongoose_1.Prop()
    ], CreateUserDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'age cannot be empty' }),
        mongoose_1.Prop()
    ], CreateUserDto.prototype, "age");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'gender cannot be empty' }),
        mongoose_1.Prop()
    ], CreateUserDto.prototype, "gender");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'address cannot be empty' }),
        mongoose_1.Prop()
    ], CreateUserDto.prototype, "address");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
