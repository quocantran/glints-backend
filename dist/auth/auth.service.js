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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const ms_1 = __importDefault(require("ms"));
const role_schema_1 = require("../roles/schemas/role.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userModel, roleModel, configService, usersService, jwtService) {
        this.userModel = userModel;
        this.roleModel = roleModel;
        this.configService = configService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.generateRefreshToken = (payload) => {
            const refreshToken = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: (0, ms_1.default)(this.configService.get('JWT_REFRESH_EXPIRES_IN')) / 1000,
            });
            return refreshToken;
        };
        this.generateNewToken = async (refreshToken, res) => {
            var _a;
            try {
                const payload = this.jwtService.verify(refreshToken, {
                    secret: this.configService.get('JWT_REFRESH_SECRET'),
                });
                const user = await this.userModel.findOne({ refreshToken }).populate({
                    path: 'role',
                    select: {
                        name: 1,
                        _id: 1,
                    },
                });
                if (user) {
                    const { _id, name, email, role } = user;
                    const newPayload = {
                        sub: 'token login',
                        iss: 'from server',
                        email,
                        _id,
                        role,
                        name,
                    };
                    const newRefreshToken = this.generateRefreshToken(newPayload);
                    await this.usersService.updateUserToken(newRefreshToken, _id.toString());
                    const userRole = user.role;
                    const data = (await this.roleModel.findOne({ _id: userRole }).populate({
                        path: 'permissions',
                        select: {
                            name: 1,
                            _id: 1,
                            apiPath: 1,
                            method: 1,
                            module: 1,
                        },
                    }));
                    res.cookie('refresh_token', newRefreshToken, {
                        httpOnly: true,
                        maxAge: (0, ms_1.default)(this.configService.get('JWT_REFRESH_EXPIRES_IN')) * 1000,
                    });
                    return {
                        access_token: this.jwtService.sign(newPayload),
                        user: {
                            _id,
                            email,
                            name,
                            role,
                            permissions: (_a = data === null || data === void 0 ? void 0 : data.permissions) !== null && _a !== void 0 ? _a : [],
                        },
                    };
                }
            }
            catch (err) {
                throw new common_1.BadRequestException('Invalid refresh token');
            }
        };
        this.logout = async (user, res) => {
            await this.usersService.updateUserToken('', user._id);
            res.clearCookie('refresh_token');
            return 'Logout success!';
        };
    }
    async validateUser(username, pass) {
        var _a;
        const user = await this.usersService.findUserByUsername(username);
        if (user) {
            const isValid = this.usersService.checkPassword(pass, user.password);
            if (isValid) {
                const userRole = user.role;
                const data = (await this.roleModel.findOne({ _id: userRole }).populate({
                    path: 'permissions',
                    select: {
                        name: 1,
                        _id: 1,
                        apiPath: 1,
                        method: 1,
                        module: 1,
                    },
                }));
                const result = Object.assign(Object.assign({}, user.toObject()), { permissions: (_a = data === null || data === void 0 ? void 0 : data.permissions) !== null && _a !== void 0 ? _a : [] });
                return result;
            }
        }
        return null;
    }
    async login(user, res) {
        const { _id, name, email, role } = user;
        const payload = {
            sub: 'token login',
            iss: 'from server',
            email,
            _id,
            role,
            name,
        };
        const refreshToken = this.generateRefreshToken(payload);
        await this.usersService.updateUserToken(refreshToken, _id);
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: (0, ms_1.default)(this.configService.get('JWT_REFRESH_EXPIRES_IN')) * 1000,
        });
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id,
                email,
                name,
                role,
                permissions: user.permissions,
            },
        };
    }
    async register(createUserDto) {
        const isExistEmail = await this.userModel.findOne({
            email: createUserDto.email,
        });
        if (isExistEmail) {
            throw new common_1.BadRequestException('Email already exists');
        }
        createUserDto.password = this.usersService.hashPassword(createUserDto.password);
        const USER_ROLE = 'NORMAL_USER';
        const userRole = await this.roleModel.findOne({ name: USER_ROLE });
        const newUser = await this.userModel.create(Object.assign(Object.assign({}, createUserDto), { role: userRole === null || userRole === void 0 ? void 0 : userRole._id }));
        return {
            _id: newUser._id,
            createdAt: newUser.createdAt,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object, Object, config_1.ConfigService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map