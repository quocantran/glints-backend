"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var role_schema_1 = require("src/roles/schemas/role.schema");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "email");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "password");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "gender");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "name");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "age");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "address");
    __decorate([
        mongoose_1.Prop({
            type: mongoose_2["default"].Schema.Types.ObjectId,
            ref: role_schema_1.Role.name
        })
    ], User.prototype, "role");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "refreshToken");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], User.prototype, "company");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], User.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], User.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], User.prototype, "deletedBy");
    User = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
