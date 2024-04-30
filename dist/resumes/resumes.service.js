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
exports.ResumesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const resume_schema_1 = require("./schemas/resume.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
const roles_service_1 = require("../roles/roles.service");
const users_service_1 = require("../users/users.service");
let ResumesService = class ResumesService {
    constructor(resumeModel, rolesService, usersService) {
        this.resumeModel = resumeModel;
        this.rolesService = rolesService;
        this.usersService = usersService;
    }
    async create(createResumeDto, user) {
        const isExist = await this.resumeModel.findOne({
            userId: user._id,
            jobId: createResumeDto.jobId,
            status: {
                $ne: 'REJECTED',
            },
        });
        if (isExist) {
            throw new common_1.BadRequestException('Bạn đã nộp hồ sơ cho công việc này rồi');
        }
        const resume = Object.assign(Object.assign({}, createResumeDto), { userId: user._id, status: 'PENDING', createdBy: {
                _id: user._id,
                email: user.email,
            }, history: [
                {
                    status: 'PENDING',
                    updatedAt: new Date(),
                    updatedBy: {
                        _id: user._id,
                        email: user.email,
                    },
                },
            ] });
        const result = await this.resumeModel.create(resume);
        return {
            _id: result._id,
            createdAt: new Date(),
        };
    }
    async findAll(qs, user) {
        try {
            let { filter, sort, population, projection } = (0, api_query_params_1.default)(qs);
            delete filter.current;
            delete filter.pageSize;
            const totalRecord = (await this.resumeModel.find(filter)).length;
            const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
            const totalPage = Math.ceil(totalRecord / limit);
            const skip = (qs.current - 1) * limit;
            const current = +qs.current;
            const roleUser = await this.rolesService.findOne(user.role._id);
            const userInfo = await this.usersService.findOne(user._id);
            if (roleUser.name === 'HR') {
                filter.companyId = userInfo.company._id;
            }
            const resumes = await this.resumeModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .select(projection)
                .sort(sort)
                .populate(population);
            return {
                meta: {
                    current: current,
                    pageSize: limit,
                    pages: totalPage,
                    total: totalRecord,
                },
                result: resumes,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('not found resume');
        const resume = await this.resumeModel.findOne({ _id: id });
        return resume;
    }
    async update(id, updateResumeDto, user) {
        const newHistory = {
            status: updateResumeDto.status,
            updatedAt: new Date(),
            updatedBy: {
                _id: user._id,
                email: user.email,
            },
        };
        return await this.resumeModel.updateOne({ _id: id }, {
            status: updateResumeDto.status,
            $push: { history: newHistory },
            updatedBy: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }
    async remove(id) {
        return await this.resumeModel.softDelete({ _id: id });
    }
    async findByUser(user) {
        const userId = user._id;
        const resumes = await this.resumeModel
            .find({
            'createdBy._id': userId,
        })
            .sort('-createdAt')
            .populate([
            {
                path: 'companyId',
                select: {
                    name: 1,
                },
            },
            {
                path: 'jobId',
                select: {
                    name: 1,
                },
            },
        ]);
        return resumes;
    }
};
ResumesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resume_schema_1.Resume.name)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService,
        users_service_1.UsersService])
], ResumesService);
exports.ResumesService = ResumesService;
//# sourceMappingURL=resumes.service.js.map