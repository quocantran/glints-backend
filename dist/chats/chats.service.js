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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chat_schema_1 = require("./schemas/chat.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
const users_service_1 = require("../users/users.service");
const mongoose_2 = __importDefault(require("mongoose"));
let ChatsService = class ChatsService {
    constructor(chatModel, userSerivce) {
        this.chatModel = chatModel;
        this.userSerivce = userSerivce;
    }
    async create(createChatDto, user) {
        if (createChatDto.type != 'text' && createChatDto.type != 'image') {
            throw new common_1.BadRequestException('Type is invalid');
        }
        if (!createChatDto.content && !createChatDto.fileUrl) {
            throw new common_1.BadRequestException('Content or fileUrl is required');
        }
        if (user.name !== createChatDto.name) {
            throw new common_1.BadRequestException('User name not found');
        }
        const newChat = new this.chatModel({
            name: user.name,
            content: createChatDto.content,
            type: createChatDto.type,
            userId: user._id,
            fileUrl: createChatDto.fileUrl,
        });
        const chat = new this.chatModel(newChat);
        return chat.save();
    }
    async findAll(qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        if (filter.hasOwnProperty('isDeleted')) {
            delete filter.isDeleted;
        }
        const totalRecord = (await this.chatModel.find(filter)).length;
        const limit = qs.pageSize ? parseInt(qs.pageSize) : 50;
        const totalPage = Math.ceil(totalRecord / limit);
        const skip = (qs.current - 1) * limit;
        const current = qs.current ? +qs.current : 1;
        const chats = await this.chatModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .populate(population);
        return {
            meta: {
                current: current,
                pageSize: limit,
                pages: totalPage,
                total: totalRecord,
            },
            result: chats,
        };
    }
    findOne(id) {
        return `This action returns a #${id} chat`;
    }
    update(id, updateChatDto) {
        return `This action updates a #${id} chat`;
    }
    async remove(id, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Id is invalid');
        }
        const chat = await this.chatModel.findOne({ _id: id });
        if (!chat) {
            throw new common_1.BadRequestException('Chat not found');
        }
        if (chat.userId.toString() !== user._id) {
            throw new common_1.BadRequestException('You do not have permission to delete this chat!');
        }
        return this.chatModel.softDelete({ _id: id });
    }
};
ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map