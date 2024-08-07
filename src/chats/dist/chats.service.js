"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ChatsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var chat_schema_1 = require("./schemas/chat.schema");
var api_query_params_1 = require("api-query-params");
var mongoose_2 = require("mongoose");
var ChatsService = /** @class */ (function () {
    function ChatsService(chatModel, userSerivce) {
        this.chatModel = chatModel;
        this.userSerivce = userSerivce;
    }
    ChatsService.prototype.create = function (createChatDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var newChat, chat;
            return __generator(this, function (_a) {
                if (createChatDto.type != 'text' && createChatDto.type != 'image') {
                    throw new common_1.BadRequestException('Type is invalid');
                }
                if (!createChatDto.content && !createChatDto.fileUrl) {
                    throw new common_1.BadRequestException('Content or fileUrl is required');
                }
                if (user.name !== createChatDto.name) {
                    throw new common_1.BadRequestException('User name not found'); //
                }
                newChat = new this.chatModel({
                    name: user.name,
                    content: createChatDto.content,
                    type: createChatDto.type,
                    userId: user._id,
                    fileUrl: createChatDto.fileUrl
                });
                chat = new this.chatModel(newChat);
                return [2 /*return*/, chat.save()];
            });
        });
    };
    ChatsService.prototype.findAll = function (qs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, sort, population, totalRecord, limit, totalPage, skip, current, chats;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = api_query_params_1["default"](qs), filter = _a.filter, sort = _a.sort, population = _a.population;
                        delete filter.current;
                        delete filter.pageSize;
                        if (filter.hasOwnProperty('isDeleted')) {
                            delete filter.isDeleted;
                        }
                        return [4 /*yield*/, this.chatModel.find(filter)];
                    case 1:
                        totalRecord = (_b.sent()).length;
                        limit = qs.pageSize ? parseInt(qs.pageSize) : 50;
                        totalPage = Math.ceil(totalRecord / limit);
                        skip = (qs.current - 1) * limit;
                        current = qs.current ? +qs.current : 1;
                        return [4 /*yield*/, this.chatModel
                                .find(filter)
                                .skip(skip)
                                .limit(limit)
                                .sort(sort)
                                .populate(population)];
                    case 2:
                        chats = _b.sent();
                        return [2 /*return*/, {
                                meta: {
                                    current: current,
                                    pageSize: limit,
                                    pages: totalPage,
                                    total: totalRecord
                                },
                                result: chats
                            }];
                }
            });
        });
    };
    ChatsService.prototype.findOne = function (id) {
        return "This action returns a #" + id + " chat";
    };
    ChatsService.prototype.update = function (id, updateChatDto) {
        return "This action updates a #" + id + " chat";
    };
    ChatsService.prototype.remove = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_2["default"].Types.ObjectId.isValid(id)) {
                            throw new common_1.BadRequestException('Id is invalid');
                        }
                        return [4 /*yield*/, this.chatModel.findOne({ _id: id })];
                    case 1:
                        chat = _a.sent();
                        if (!chat) {
                            throw new common_1.BadRequestException('Chat not found');
                        }
                        if (chat.userId.toString() !== user._id) {
                            throw new common_1.BadRequestException('You do not have permission to delete this chat!');
                        }
                        return [2 /*return*/, this.chatModel.softDelete({ _id: id })];
                }
            });
        });
    };
    ChatsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(chat_schema_1.Chat.name))
    ], ChatsService);
    return ChatsService;
}());
exports.ChatsService = ChatsService;
