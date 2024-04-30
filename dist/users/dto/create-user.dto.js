"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = exports.RegisterUserDto = exports.Company = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_2 = __importDefault(require("mongoose"));
class Company {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Company.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
exports.Company = Company;
class RegisterUserDto {
}
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email cannot be empty' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password cannot be empty' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'role cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], RegisterUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'age cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'gender cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'address cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Company),
    __metadata("design:type", Company)
], RegisterUserDto.prototype, "company", void 0);
exports.RegisterUserDto = RegisterUserDto;
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email cannot be empty' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password cannot be empty' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'age cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'gender cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'address cannot be empty' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map