"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatsModule = void 0;
var common_1 = require("@nestjs/common");
var chats_service_1 = require("./chats.service");
var mongoose_1 = require("@nestjs/mongoose");
var chat_schema_1 = require("./schemas/chat.schema");
var chats_controller_1 = require("./chats.controller");
var users_module_1 = require("src/users/users.module");
var ChatsModule = /** @class */ (function () {
    function ChatsModule() {
    }
    ChatsModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: 'Chat',
                        schema: chat_schema_1.ChatSchema
                    }
                ]),
                users_module_1.UsersModule
            ],
            controllers: [chats_controller_1.ChatsController],
            providers: [chats_service_1.ChatsService]
        })
    ], ChatsModule);
    return ChatsModule;
}());
exports.ChatsModule = ChatsModule;
