"use strict";
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
exports.OtpsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var otp_schema_1 = require("./schemas/otp.schema");
var users_service_1 = require("src/users/users.service");
var crypto_1 = require("crypto");
var OtpsService = /** @class */ (function () {
    function OtpsService(otpModel, userService, mailService) {
        this.otpModel = otpModel;
        this.userService = userService;
        this.mailService = mailService;
    }
    OtpsService.prototype.create = function (createOtpDto) {
        return __awaiter(this, void 0, void 0, function () {
            var isExist, existOtp, otpToken, newOtp, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findUserByUsername(createOtpDto.email)];
                    case 1:
                        isExist = _a.sent();
                        if (!isExist) {
                            throw new common_1.BadRequestException('User not found');
                        }
                        return [4 /*yield*/, this.otpModel.findOne({ email: createOtpDto.email })];
                    case 2:
                        existOtp = _a.sent();
                        if (existOtp) {
                            throw new common_1.BadRequestException('Otp already exist');
                        }
                        otpToken = this.genarateToken();
                        newOtp = {
                            token: otpToken,
                            email: createOtpDto.email
                        };
                        return [4 /*yield*/, this.mailService.sendMail(createOtpDto.email, otpToken.toString())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.otpModel.create(newOtp)];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OtpsService.prototype.genarateToken = function () {
        var token = crypto_1["default"].randomInt(0, Math.pow(2, 32));
        return token;
    };
    OtpsService.prototype.checkToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var otp;
            return __generator(this, function (_a) {
                otp = this.otpModel.findOne({ token: token }).lean().exec();
                if (!otp) {
                    throw new common_1.BadRequestException('Token not found');
                }
                return [2 /*return*/, otp];
            });
        });
    };
    OtpsService.prototype.remove = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.otpModel.deleteOne({ token: token })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OtpsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(otp_schema_1.Otp.name)), __param(1, common_1.Inject(common_1.forwardRef(function () { return users_service_1.UsersService; })))
    ], OtpsService);
    return OtpsService;
}());
exports.OtpsService = OtpsService;
