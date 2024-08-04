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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const skill_schema_1 = require("./schemas/skill.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
let SkillsService = class SkillsService {
    constructor(skillModel) {
        this.skillModel = skillModel;
    }
    async create(createSkillDto, user) {
        const isExist = await this.skillModel.findOne({ name: createSkillDto.name });
        if (isExist) {
            throw new common_1.BadRequestException('Skill already exist');
        }
        createSkillDto.name = createSkillDto.name.toUpperCase();
        const result = this.skillModel.create(Object.assign(Object.assign({}, createSkillDto), { createdBy: user.email }));
        return result;
    }
    async findAll(qs) {
        try {
            const { filter, sort, population } = (0, api_query_params_1.default)(qs);
            delete filter.current;
            delete filter.pageSize;
            const totalRecord = (await this.skillModel.find(filter)).length;
            const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
            const totalPage = Math.ceil(totalRecord / limit);
            const skip = (qs.current - 1) * limit;
            const current = +qs.current;
            const skills = await this.skillModel
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
                result: skills,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    findOne(id) {
        const skill = this.skillModel.findById(id);
        if (!skill) {
            throw new common_1.BadRequestException('Skill not found');
        }
        return skill;
    }
    async update(id, updateSkillDto, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Skill not found');
        }
        const isExist = await this.skillModel.findOne({ _id: id });
        if (!isExist) {
            throw new common_1.BadRequestException('Skill not found');
        }
        const newJob = Object.assign(Object.assign({}, updateSkillDto), { updatedBy: {
                _id: user._id,
                email: user.email
            } });
        return await this.skillModel.updateOne({ _id: id }, newJob);
    }
    async remove(id) {
        const isExist = await this.skillModel.findOne({ _id: id });
        if (!isExist) {
            throw new common_1.BadRequestException('Skill not found');
        }
        return await this.skillModel.softDelete({ _id: id });
    }
};
SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(skill_schema_1.Skill.name)),
    __metadata("design:paramtypes", [Object])
], SkillsService);
exports.SkillsService = SkillsService;
//# sourceMappingURL=skills.service.js.map