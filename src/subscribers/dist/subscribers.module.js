"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscribersModule = void 0;
var common_1 = require("@nestjs/common");
var subscribers_service_1 = require("./subscribers.service");
var subscribers_controller_1 = require("./subscribers.controller");
var mongoose_1 = require("@nestjs/mongoose");
var subscriber_schema_1 = require("./schemas/subscriber.schema");
var SubscribersModule = /** @class */ (function () {
    function SubscribersModule() {
    }
    SubscribersModule_1 = SubscribersModule;
    var SubscribersModule_1;
    SubscribersModule = SubscribersModule_1 = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: subscriber_schema_1.Subscriber.name, schema: subscriber_schema_1.SubscriberSchema },
                ]),
            ],
            controllers: [subscribers_controller_1.SubscribersController],
            providers: [subscribers_service_1.SubscribersService],
            exports: [subscribers_service_1.SubscribersService, SubscribersModule_1]
        })
    ], SubscribersModule);
    return SubscribersModule;
}());
exports.SubscribersModule = SubscribersModule;
