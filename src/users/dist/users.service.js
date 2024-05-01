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
exports.__esModule = true;
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var user_schema_1 = require("./schemas/user.schema");
var bcrypt = require("bcryptjs");
var mongoose_2 = require("mongoose");
var api_query_params_1 = require("api-query-params");
var UsersService = /** @class */ (function () {
    function UsersService(userModel, forgotPasswwordService) {
        var _this = this;
        this.userModel = userModel;
        this.forgotPasswwordService = forgotPasswwordService;
        this.hashPassword = function (password) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            return hash;
        };
        this.checkPassword = function (password, hash) {
            return bcrypt.compareSync(password, hash);
        };
        this.generateOtp = function (length) {
            var digits = '0123456789';
            var OTP = '';
            for (var i = 0; i < length; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        };
        this.updateUserToken = function (refreshToken, _id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.updateOne({ _id: _id }, { refreshToken: refreshToken })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.updatePassword = function (id, updateUserDto) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_2["default"].Types.ObjectId.isValid(id)) {
                            throw new common_1.NotFoundException('not found user');
                        }
                        return [4 /*yield*/, this.userModel.findOne({ _id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('not found user');
                        }
                        if (!this.checkPassword(updateUserDto.password, user.password)) {
                            throw new common_1.BadRequestException('Current password is incorrect');
                        }
                        if (updateUserDto.newPassword !== updateUserDto.repeatedPassword) {
                            throw new common_1.BadRequestException('Password is not match');
                        }
                        return [4 /*yield*/, this.userModel.updateOne({
                                _id: id
                            }, {
                                password: this.hashPassword(updateUserDto.newPassword)
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    UsersService.prototype.create = function (registerUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var isExist, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({
                            email: registerUserDto.email
                        })];
                    case 1:
                        isExist = _a.sent();
                        if (isExist) {
                            throw new common_1.BadRequestException('Email already exists');
                        }
                        registerUserDto.password = this.hashPassword(registerUserDto.password);
                        return [4 /*yield*/, this.userModel.create(registerUserDto)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, {
                                _id: user._id,
                                createdAt: user.createdAt
                            }];
                }
            });
        });
    };
    UsersService.prototype.findAll = function (qs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, sort, population, totalRecord, limit, totalPage, skip, current, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = api_query_params_1["default"](qs), filter = _a.filter, sort = _a.sort, population = _a.population;
                        delete filter.current;
                        delete filter.pageSize;
                        return [4 /*yield*/, this.userModel.find(filter)];
                    case 1:
                        totalRecord = (_b.sent()).length;
                        limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
                        totalPage = Math.ceil(totalRecord / limit);
                        skip = (qs.current - 1) * limit;
                        current = qs.current ? +qs.current : 1;
                        return [4 /*yield*/, this.userModel
                                .find(filter)
                                .skip(skip)
                                .limit(limit)
                                .sort(sort)
                                .select('-password -refreshToken')
                                .populate(population)];
                    case 2:
                        users = _b.sent();
                        return [2 /*return*/, {
                                meta: {
                                    current: current,
                                    pageSize: limit,
                                    pages: totalPage,
                                    total: totalRecord
                                },
                                result: users
                            }];
                }
            });
        });
    };
    UsersService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, password, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (mongoose_2["default"].Types.ObjectId.isValid(id) === false)
                            throw new common_1.NotFoundException('not found user');
                        return [4 /*yield*/, this.userModel.findOne({ _id: id }).populate({
                                path: 'role',
                                select: {
                                    name: 1,
                                    _id: 1
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        _a = user.toJSON(), password = _a.password, result = __rest(_a, ["password"]);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UsersService.prototype.findUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userModel
                        .findOne({ email: username, isDeleted: 'false' })
                        .populate({
                        path: 'role',
                        select: {
                            name: 1,
                            _id: 1
                        }
                    })];
            });
        });
    };
    UsersService.prototype.update = function (id, updateUserDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.updateOne({
                            _id: id
                        }, __assign(__assign({}, updateUserDto), { updatedBy: {
                                _id: user._id,
                                name: user.name,
                                email: user.email
                            } }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.softDelete({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.forgotPassword = function (forgotPasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, otp, TIME_EXPIRED, objectForgot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({
                            email: forgotPasswordDto.email
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('Email not found');
                        }
                        otp = this.generateOtp(6);
                        TIME_EXPIRED = 3 * 60;
                        objectForgot = {
                            email: forgotPasswordDto.email,
                            otp: otp,
                            expiredAt: new Date(Date.now() + TIME_EXPIRED)
                        };
                        return [4 /*yield*/, this.forgotPasswwordService.create(objectForgot)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.countUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.countDocuments()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(user_schema_1.User.name))
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
