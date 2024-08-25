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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_schema_1 = require("./schemas/job.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
const microservices_1 = require("@nestjs/microservices");
let JobsService = class JobsService {
    constructor(jobModel, client) {
        this.jobModel = jobModel;
        this.client = client;
    }
    async create(createJobDto, user) {
        const newJob = await this.jobModel.create(createJobDto);
        this.client.emit('job_created', {
            senderId: createJobDto.company._id,
            content: `Công ty bạn đang theo dõi ${createJobDto.company.name} đã tạo mới công việc ${createJobDto.name}!`,
            type: 'job',
            options: {
                jobId: newJob._id,
            },
        });
        return newJob;
    }
    async findAll(qs) {
        try {
            const { filter, sort, population } = (0, api_query_params_1.default)(qs);
            delete filter.current;
            delete filter.pageSize;
            delete filter.companyId;
            delete filter.companyName;
            if (qs.companyId && qs.companyName) {
                filter.company = {
                    _id: qs.companyId,
                    name: qs.companyName,
                };
            }
            const totalRecord = (await this.jobModel.find(filter)).length;
            const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
            const totalPage = Math.ceil(totalRecord / limit);
            const skip = (qs.current - 1) * limit;
            const current = +qs.current;
            const jobs = await this.jobModel
                .find(filter)
                .populate({
                path: 'company',
                select: {
                    name: 1,
                    location: 1,
                    logo: 1,
                    address: 1,
                },
            })
                .skip(skip)
                .limit(limit)
                .sort(sort);
            return {
                meta: {
                    current: current,
                    pageSize: limit,
                    pages: totalPage,
                    total: totalRecord,
                },
                result: jobs,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findJobsBySkillName(names) {
        const regexNames = names.map((name) => new RegExp(name, 'i'));
        return await this.jobModel
            .find({ skills: { $in: regexNames } })
            .lean()
            .exec();
    }
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Job not found');
        }
        const job = await this.jobModel
            .findOne({ _id: id, isDeleted: 'false' })
            .populate({
            path: 'company',
            select: {
                name: 1,
                location: 1,
                logo: 1,
                address: 1,
            },
        });
        if (!job) {
            throw new common_1.BadRequestException('Job not found');
        }
        return job;
    }
    async update(id, updateJobDto, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Job not found');
        }
        const job = Object.assign(Object.assign({}, updateJobDto), { updatedBy: {
                _id: user._id,
                name: user.name,
                email: user.email,
            } });
        return await this.jobModel.updateOne({ _id: id }, job);
    }
    async remove(id) {
        return await this.jobModel.softDelete({ _id: id });
    }
    async search(searchJobDto) {
        try {
            const { name, location } = searchJobDto;
            const query = {};
            if (name) {
                const regexName = new RegExp(name, 'i').source;
                query.name = { $regex: regexName, $options: 'i' };
            }
            if (location) {
                const regexLocation = new RegExp(location, 'i').source;
                query.location = { $regex: regexLocation, $options: 'i' };
            }
            const jobs = await this.jobModel.find(query).select('name');
            return jobs;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async countJobs() {
        return await this.jobModel.countDocuments();
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __param(1, (0, common_1.Inject)('RABBITMQ_SERVICE')),
    __metadata("design:paramtypes", [Object, microservices_1.ClientProxy])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map