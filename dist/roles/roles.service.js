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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("./schemas/role.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
let RolesService = class RolesService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(createRoleDto, user) {
        const isExist = await this.roleModel.findOne({ name: createRoleDto.name });
        if (isExist) {
            throw new common_1.BadRequestException('Role already exist');
        }
        const role = await this.roleModel.create(Object.assign(Object.assign({}, createRoleDto), { createdBy: {
                _id: user._id,
                email: user.email,
            } }));
        return {
            _id: role._id,
            createdAt: role.createdAt,
        };
    }
    async findAll(qs) {
        const { filter, sort, population, projection } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        const totalRecord = (await this.roleModel.find(filter)).length;
        const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
        const totalPage = Math.ceil(totalRecord / limit);
        const skip = (qs.current - 1) * limit;
        const current = +qs.current;
        const roles = await this.roleModel
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
            result: roles,
        };
    }
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('not found role');
        }
        const role = await this.roleModel.findById(id).populate({
            path: 'permissions',
            select: {
                _id: 1,
                apiPath: 1,
                name: 1,
                method: 1,
                module: 1,
            },
        });
        if (!role)
            throw new common_1.NotFoundException('not found role');
        return role;
    }
    async update(id, updateRoleDto, user) {
        return await this.roleModel.updateOne({ _id: id }, Object.assign(Object.assign({}, updateRoleDto), { updatedBy: {
                _id: user._id,
                email: user.email,
            } }));
    }
    async remove(id) {
        return this.roleModel.softDelete({ _id: id });
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map