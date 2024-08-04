"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriberSchema = exports.Subscriber = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Subscriber = /** @class */ (function () {
    function Subscriber() {
    }
    __decorate([
        mongoose_1.Prop()
    ], Subscriber.prototype, "email");
    __decorate([
        mongoose_1.Prop({ type: [mongoose_2["default"].Schema.Types.ObjectId], ref: 'Skill' })
    ], Subscriber.prototype, "skills");
    __decorate([
        mongoose_1.Prop()
    ], Subscriber.prototype, "isActive");
    __decorate([
        mongoose_1.Prop()
    ], Subscriber.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], Subscriber.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Subscriber.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Subscriber.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Subscriber.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Subscriber.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Subscriber.prototype, "deletedBy");
    Subscriber = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Subscriber);
    return Subscriber;
}());
exports.Subscriber = Subscriber;
exports.SubscriberSchema = mongoose_1.SchemaFactory.createForClass(Subscriber);
