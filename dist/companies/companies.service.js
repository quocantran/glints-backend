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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const company_schema_1 = require("./schemas/company.schema");
const mongoose_1 = require("@nestjs/mongoose");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
let CompaniesService = class CompaniesService {
    constructor(companyModel) {
        this.companyModel = companyModel;
    }
    async create(createCompanyDto, user) {
        const newCompany = await this.companyModel.create(Object.assign(Object.assign({}, createCompanyDto), { createdBy: {
                _id: user._id,
                name: user.name,
                email: user.email,
            } }));
        return newCompany;
    }
    async findAll(qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        const totalRecord = (await this.companyModel.find(filter)).length;
        const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
        const totalPage = Math.ceil(totalRecord / limit);
        const skip = (qs.current - 1) * limit;
        const current = +qs.current;
        const companies = await this.companyModel
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
            result: companies,
        };
    }
    async followCompany(company, user) {
        const { companyId } = company;
        const companyExist = await this.companyModel.findOne({ _id: companyId });
        if (!companyExist)
            throw new common_1.BadRequestException('not found company');
        const userFollow = companyExist.usersFollow.some((item) => item.toString() === user._id.toString());
        if (userFollow)
            throw new common_1.BadRequestException('user already follow company');
        await this.companyModel
            .findByIdAndUpdate(company.companyId, { $addToSet: { usersFollow: user._id.toString() } }, { new: true })
            .exec();
        return user._id;
    }
    async unfollowCompany(company, user) {
        const { companyId } = company;
        const companyExist = await this.companyModel.findOne({ _id: companyId });
        if (!companyExist)
            throw new common_1.BadRequestException('not found company');
        const userFollow = companyExist.usersFollow.some((item) => item.toString() === user._id.toString());
        if (!userFollow)
            throw new common_1.BadRequestException('User not follow company');
        console.log(userFollow);
        console.log(user._id);
        await this.companyModel
            .findByIdAndUpdate(company.companyId, { $pull: { usersFollow: user._id.toString() } }, { new: true })
            .exec();
        return user._id;
    }
    async findOne(id) {
        if (mongoose_2.default.Types.ObjectId.isValid(id) === false)
            throw new common_1.NotFoundException('not found company');
        const company = await this.companyModel.findOne({ _id: id });
        if (!company)
            throw new common_1.NotFoundException('not found company');
        return company;
    }
    async update(id, updateCompanyDto, user) {
        const updatedCompany = await this.companyModel.updateOne({ _id: id }, Object.assign(Object.assign({}, updateCompanyDto), { updatedBy: {
                _id: user._id,
                name: user.name,
                email: user.email,
            } }));
        return updatedCompany;
    }
    async remove(id, user) {
        await this.companyModel.updateOne({ _id: id }, {
            deletedBy: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
        return this.companyModel.softDelete({
            _id: id,
        });
    }
    async countCompanies() {
        return this.companyModel.countDocuments();
    }
};
CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __metadata("design:paramtypes", [Object])
], CompaniesService);
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companies.service.js.map