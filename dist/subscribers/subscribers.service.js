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
exports.SubscribersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const subscriber_schema_1 = require("./schemas/subscriber.schema");
const mongoose_2 = __importDefault(require("mongoose"));
let SubscribersService = class SubscribersService {
    constructor(subscriberModel) {
        this.subscriberModel = subscriberModel;
    }
    async create(createSubscriberDto) {
        if (createSubscriberDto.skills.length === 0) {
            throw new common_1.BadRequestException('Skills is required');
        }
        createSubscriberDto.skills.forEach(skill => {
            if (!mongoose_2.default.Types.ObjectId.isValid(skill)) {
                throw new common_1.BadRequestException('Skill not found');
            }
        });
        const isExist = await this.subscriberModel.findOne({ email: createSubscriberDto.email });
        if (isExist) {
            throw new common_1.BadRequestException('Subscriber already exist');
        }
        const result = await this.subscriberModel.create(createSubscriberDto);
        return result;
    }
    async update(id, updateSubscriberDto) {
        updateSubscriberDto.skills.forEach(skill => {
            if (!mongoose_2.default.Types.ObjectId.isValid(skill)) {
                throw new common_1.BadRequestException('Skill not found');
            }
        });
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Subscriber not found');
        }
        const result = await this.subscriberModel.findByIdAndUpdate(id, updateSubscriberDto, { new: true });
        return result;
    }
    async getAll() {
        const subscribers = await this.subscriberModel.find({}).populate({
            path: 'skills',
            select: {
                _id: 0,
                name: 1
            }
        });
        return subscribers;
    }
    remove(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Subscriber not found');
        }
        return this.subscriberModel.softDelete({ _id: id });
    }
};
SubscribersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscriber_schema_1.Subscriber.name)),
    __metadata("design:paramtypes", [Object])
], SubscribersService);
exports.SubscribersService = SubscribersService;
//# sourceMappingURL=subscribers.service.js.map