"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var ms_1 = require("ms");
var role_schema_1 = require("src/roles/schemas/role.schema");
var user_schema_1 = require("src/users/schemas/user.schema");
var crypto_1 = require("crypto");
var AuthService = /** @class */ (function () {
    function AuthService(userModel, roleModel, configService, usersService, jwtService) {
        var _this = this;
        this.userModel = userModel;
        this.roleModel = roleModel;
        this.configService = configService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.generateRefreshToken = function (payload) {
            var refreshToken = _this.jwtService.sign(payload, {
                secret: _this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: ms_1["default"](_this.configService.get('JWT_REFRESH_EXPIRES_IN')) / 1000
            });
            return refreshToken;
        };
        this.generateNewToken = function (refreshToken, res) { return __awaiter(_this, void 0, void 0, function () {
            var payload, user, _id, name, email, role, newPayload, newRefreshToken, userRole, data, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        payload = this.jwtService.verify(refreshToken, {
                            secret: this.configService.get('JWT_REFRESH_SECRET')
                        });
                        return [4 /*yield*/, this.userModel.findOne({ refreshToken: refreshToken }).populate({
                                path: 'role',
                                select: {
                                    name: 1,
                                    _id: 1
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 4];
                        _id = user._id, name = user.name, email = user.email, role = user.role;
                        newPayload = {
                            sub: 'token login',
                            iss: 'from server',
                            email: email,
                            _id: _id,
                            role: role,
                            name: name
                        };
                        newRefreshToken = this.generateRefreshToken(newPayload);
                        return [4 /*yield*/, this.usersService.updateUserToken(newRefreshToken, _id.toString())];
                    case 2:
                        _b.sent();
                        userRole = user.role;
                        return [4 /*yield*/, this.roleModel.findOne({ _id: userRole }).populate({
                                path: 'permissions',
                                select: {
                                    name: 1,
                                    _id: 1,
                                    apiPath: 1,
                                    method: 1,
                                    module: 1
                                }
                            })];
                    case 3:
                        data = (_b.sent());
                        res.cookie('refresh_token', newRefreshToken, {
                            httpOnly: true,
                            maxAge: ms_1["default"](this.configService.get('JWT_REFRESH_EXPIRES_IN')) * 1000,
                            sameSite: 'none',
                            secure: true
                        });
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(newPayload),
                                user: {
                                    _id: _id,
                                    email: email,
                                    name: name,
                                    role: role,
                                    permissions: (_a = data === null || data === void 0 ? void 0 : data.permissions) !== null && _a !== void 0 ? _a : []
                                }
                            }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        throw new common_1.BadRequestException('Invalid refresh token');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.logout = function (user, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.updateUserToken('', user._id)];
                    case 1:
                        _a.sent();
                        res.clearCookie('refresh_token');
                        return [2 /*return*/, 'Logout success!'];
                }
            });
        }); };
    }
    AuthService.prototype.validateUser = function (username, pass) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var user, isValid, userRole, data, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.usersService.findUserByUsername(username)];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 3];
                        isValid = this.usersService.checkPassword(pass, user.password);
                        if (!isValid) return [3 /*break*/, 3];
                        userRole = user.role;
                        return [4 /*yield*/, this.roleModel.findOne({ _id: userRole }).populate({
                                path: 'permissions',
                                select: {
                                    name: 1,
                                    _id: 1,
                                    apiPath: 1,
                                    method: 1,
                                    module: 1
                                }
                            })];
                    case 2:
                        data = (_b.sent());
                        result = __assign(__assign({}, user.toObject()), { permissions: (_a = data === null || data === void 0 ? void 0 : data.permissions) !== null && _a !== void 0 ? _a : [] });
                        return [2 /*return*/, result];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    AuthService.prototype.login = function (user, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, name, email, role, payload, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = user._id, name = user.name, email = user.email, role = user.role;
                        payload = {
                            sub: 'token login',
                            iss: 'from server',
                            email: email,
                            _id: _id,
                            role: role,
                            name: name
                        };
                        refreshToken = this.generateRefreshToken(payload);
                        return [4 /*yield*/, this.usersService.updateUserToken(refreshToken, _id)];
                    case 1:
                        _a.sent();
                        res.cookie('refresh_token', refreshToken, {
                            httpOnly: true,
                            maxAge: ms_1["default"](this.configService.get('JWT_REFRESH_EXPIRES_IN')) * 1000,
                            sameSite: 'none',
                            secure: true
                        });
                        res.cookie('userId', _id);
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: {
                                    _id: _id,
                                    email: email,
                                    name: name,
                                    role: role,
                                    permissions: user.permissions
                                }
                            }];
                }
            });
        });
    };
    AuthService.prototype.register = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var isExistEmail, USER_ROLE, userRole, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({
                            email: createUserDto.email
                        })];
                    case 1:
                        isExistEmail = _a.sent();
                        if (isExistEmail) {
                            throw new common_1.BadRequestException('Email already exists');
                        }
                        createUserDto.password = this.usersService.hashPassword(createUserDto.password);
                        USER_ROLE = 'NORMAL_USER';
                        return [4 /*yield*/, this.roleModel.findOne({ name: USER_ROLE })];
                    case 2:
                        userRole = _a.sent();
                        return [4 /*yield*/, this.userModel.create(__assign(__assign({}, createUserDto), { role: userRole === null || userRole === void 0 ? void 0 : userRole._id }))];
                    case 3:
                        newUser = _a.sent();
                        return [2 /*return*/, {
                                _id: newUser._id,
                                createdAt: newUser.createdAt
                            }];
                }
            });
        });
    };
    AuthService.prototype.googleLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isExistEmail, currentUser, userRole, newPassword, hashedPassword, USER_ROLE, payload, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        return [4 /*yield*/, this.userModel.findOne({
                                email: user.email
                            })];
                    case 1:
                        isExistEmail = (_a.sent());
                        newPassword = crypto_1["default"].randomBytes(20).toString('hex');
                        hashedPassword = this.usersService.hashPassword(newPassword);
                        if (!!isExistEmail) return [3 /*break*/, 4];
                        USER_ROLE = 'NORMAL_USER';
                        return [4 /*yield*/, this.roleModel.findOne({ name: USER_ROLE })];
                    case 2:
                        userRole = _a.sent();
                        return [4 /*yield*/, this.userModel.create({
                                email: user.email,
                                name: user.firstName + ' ' + user.lastName,
                                role: userRole === null || userRole === void 0 ? void 0 : userRole._id,
                                password: hashedPassword,
                                permissions: []
                            })];
                    case 3:
                        currentUser = (_a.sent());
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.roleModel.findOne({ _id: isExistEmail.role })];
                    case 5:
                        userRole = _a.sent();
                        return [4 /*yield*/, this.userModel.updateOne({
                                email: user.email
                            }, {
                                $set: {
                                    name: user.firstName + ' ' + user.lastName
                                }
                            })];
                    case 6:
                        _a.sent();
                        currentUser = {
                            email: isExistEmail.email,
                            _id: isExistEmail._id,
                            role: isExistEmail.role,
                            name: user.firstName + ' ' + user.lastName,
                            permissions: userRole.permissions
                        };
                        _a.label = 7;
                    case 7:
                        payload = {
                            sub: 'token login',
                            iss: 'from server',
                            email: currentUser.email,
                            _id: currentUser._id,
                            role: {
                                _id: userRole._id,
                                name: userRole.name
                            },
                            name: currentUser.name
                        };
                        refreshToken = this.generateRefreshToken(payload);
                        return [4 /*yield*/, this.usersService.updateUserToken(refreshToken, currentUser._id)];
                    case 8:
                        _a.sent();
                        res.cookie('refresh_token', refreshToken, {
                            httpOnly: true,
                            maxAge: ms_1["default"](this.configService.get('JWT_REFRESH_EXPIRES_IN')) * 1000,
                            sameSite: 'none',
                            secure: true
                        });
                        res.cookie('userId', currentUser._id);
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload)
                            }];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
        __param(1, mongoose_1.InjectModel(role_schema_1.Role.name))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
