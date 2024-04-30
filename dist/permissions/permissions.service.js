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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const permission_schema_1 = require("./schemas/permission.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
let PermissionsService = class PermissionsService {
    constructor(permissionsModel) {
        this.permissionsModel = permissionsModel;
    }
    async create(createPermissionDto, user) {
        const isExist = await this.permissionsModel.findOne({
            apiPath: createPermissionDto.apiPath,
            method: createPermissionDto.method,
        });
        if (isExist) {
            throw new common_1.BadRequestException('Permission already exist');
        }
        const result = await this.permissionsModel.create(Object.assign(Object.assign({}, createPermissionDto), { createdBy: {
                _id: user._id,
                email: user.email,
            } }));
        return {
            id: result._id,
            createdAt: result.createdAt,
        };
    }
    async findAll(qs) {
        const { filter, sort, population, projection } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        const totalRecord = (await this.permissionsModel.find(filter)).length;
        const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
        const totalPage = Math.ceil(totalRecord / limit);
        const skip = (qs.current - 1) * limit;
        const current = +qs.current;
        const permissions = await this.permissionsModel
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
            result: permissions,
        };
    }
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('not found permission');
        const result = await this.permissionsModel.findOne({ _id: id });
        return result;
    }
    async update(id, updatePermissionDto, user) {
        return await this.permissionsModel.updateOne({ _id: id }, Object.assign(Object.assign({}, updatePermissionDto), { updatedBy: {
                _id: user._id,
                email: user.email,
            } }));
    }
    async remove(id) {
        return await this.permissionsModel.softDelete({ _id: id });
    }
};
PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __metadata("design:paramtypes", [Object])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map