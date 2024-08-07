"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatSchema = exports.Chat = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Chat = /** @class */ (function () {
    function Chat() {
    }
    __decorate([
        mongoose_1.Prop()
    ], Chat.prototype, "name");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2["default"].Schema.Types.ObjectId, ref: 'User' })
    ], Chat.prototype, "userId");
    __decorate([
        mongoose_1.Prop()
    ], Chat.prototype, "content");
    __decorate([
        mongoose_1.Prop({ "enum": ['text', 'image'] })
    ], Chat.prototype, "type");
    __decorate([
        mongoose_1.Prop()
    ], Chat.prototype, "fileUrl");
    __decorate([
        mongoose_1.Prop()
    ], Chat.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], Chat.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Chat.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Chat.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Chat.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Chat.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Chat.prototype, "deletedBy");
    Chat = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Chat);
    return Chat;
}());
exports.Chat = Chat;
exports.ChatSchema = mongoose_1.SchemaFactory.createForClass(Chat);
