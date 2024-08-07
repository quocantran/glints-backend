"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = __importStar(require("bcryptjs"));
const mongoose_2 = __importDefault(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
const otps_service_1 = require("../otps/otps.service");
const mail_service_1 = require("../mail/mail.service");
let UsersService = class UsersService {
    constructor(userModel, otpService, mailService) {
        this.userModel = userModel;
        this.otpService = otpService;
        this.mailService = mailService;
        this.hashPassword = (password) => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            return hash;
        };
        this.checkPassword = (password, hash) => {
            return bcrypt.compareSync(password, hash);
        };
        this.generateOtp = (length) => {
            const digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < length; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        };
        this.updateUserToken = async (refreshToken, _id) => {
            await this.userModel.updateOne({ _id }, { refreshToken });
        };
        this.updatePassword = async (id, updateUserDto) => {
            if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
                throw new common_1.NotFoundException('not found user');
            }
            const user = await this.userModel.findOne({ _id: id });
            if (!user) {
                throw new common_1.NotFoundException('not found user');
            }
            if (!this.checkPassword(updateUserDto.password, user.password)) {
                throw new common_1.BadRequestException('Current password is incorrect');
            }
            if (updateUserDto.newPassword !== updateUserDto.repeatedPassword) {
                throw new common_1.BadRequestException('Password is not match');
            }
            return await this.userModel.updateOne({
                _id: id,
            }, {
                password: this.hashPassword(updateUserDto.newPassword),
            });
        };
    }
    async create(registerUserDto) {
        const isExist = await this.userModel.findOne({
            email: registerUserDto.email,
        });
        if (isExist) {
            throw new common_1.BadRequestException('Email already exists');
        }
        registerUserDto.password = this.hashPassword(registerUserDto.password);
        const user = await this.userModel.create(registerUserDto);
        return {
            _id: user._id,
            createdAt: user.createdAt,
        };
    }
    async findAll(qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        const totalRecord = (await this.userModel.find(filter)).length;
        const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
        const totalPage = Math.ceil(totalRecord / limit);
        const skip = (qs.current - 1) * limit;
        const current = qs.current ? +qs.current : 1;
        const users = await this.userModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .select('-password -refreshToken')
            .populate(population);
        return {
            meta: {
                current: current,
                pageSize: limit,
                pages: totalPage,
                total: totalRecord,
            },
            result: users,
        };
    }
    async findOne(id) {
        if (mongoose_2.default.Types.ObjectId.isValid(id) === false)
            throw new common_1.NotFoundException('not found user');
        const user = await this.userModel.findOne({ _id: id }).populate({
            path: 'role',
            select: {
                name: 1,
                _id: 1,
            },
        });
        const _a = user.toJSON(), { password } = _a, result = __rest(_a, ["password"]);
        return result;
    }
    async findUserByUsername(username) {
        return this.userModel
            .findOne({ email: username, isDeleted: 'false' })
            .populate({
            path: 'role',
            select: {
                name: 1,
                _id: 1,
            },
        });
    }
    async findUserByName(name) {
        return await this.userModel.findOne({ name: name });
    }
    async update(id, updateUserDto, user) {
        return await this.userModel.updateOne({
            _id: id,
        }, Object.assign(Object.assign({}, updateUserDto), { updatedBy: {
                _id: user._id,
                name: user.name,
                email: user.email,
            } }));
    }
    async remove(id) {
        return await this.userModel.softDelete({ _id: id });
    }
    async forgotPassword(token) {
        const user = await this.otpService.checkToken(token);
        if (!user) {
            throw new common_1.BadRequestException('Token not found!');
        }
        const existUser = await this.findUserByUsername(user.email);
        if (!existUser) {
            throw new common_1.BadRequestException('User not found!');
        }
        const newPassword = this.generateOtp(8);
        const passwordHash = this.hashPassword(newPassword);
        await this.userModel.updateOne({ email: user.email }, { password: passwordHash });
        await this.mailService.sendPasswordResetMail(user.email, newPassword);
        await this.otpService.remove(token);
        return true;
    }
    async countUser() {
        return await this.userModel.countDocuments();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => otps_service_1.OtpsService))),
    __metadata("design:paramtypes", [Object, otps_service_1.OtpsService,
        mail_service_1.MailService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map