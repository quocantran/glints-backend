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
exports.SkillsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var skill_schema_1 = require("./schemas/skill.schema");
var api_query_params_1 = require("api-query-params");
var mongoose_2 = require("mongoose");
var SkillsService = /** @class */ (function () {
    function SkillsService(skillModel) {
        this.skillModel = skillModel;
    }
    SkillsService.prototype.create = function (createSkillDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var isExist, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.skillModel.findOne({ name: createSkillDto.name })];
                    case 1:
                        isExist = _a.sent();
                        if (isExist) {
                            throw new common_1.BadRequestException('Skill already exist');
                        }
                        createSkillDto.name = createSkillDto.name.toUpperCase();
                        result = this.skillModel.create(__assign(__assign({}, createSkillDto), { createdBy: user.email }));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SkillsService.prototype.findAll = function (qs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, sort, population, totalRecord, limit, totalPage, skip, current, skills, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = api_query_params_1["default"](qs), filter = _a.filter, sort = _a.sort, population = _a.population;
                        delete filter.current;
                        delete filter.pageSize;
                        return [4 /*yield*/, this.skillModel.find(filter)];
                    case 1:
                        totalRecord = (_b.sent()).length;
                        limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
                        totalPage = Math.ceil(totalRecord / limit);
                        skip = (qs.current - 1) * limit;
                        current = +qs.current;
                        return [4 /*yield*/, this.skillModel
                                .find(filter)
                                .skip(skip)
                                .limit(limit)
                                .sort(sort)
                                .populate(population)];
                    case 2:
                        skills = _b.sent();
                        return [2 /*return*/, {
                                meta: {
                                    current: current,
                                    pageSize: limit,
                                    pages: totalPage,
                                    total: totalRecord
                                },
                                result: skills
                            }];
                    case 3:
                        err_1 = _b.sent();
                        throw new common_1.BadRequestException(err_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SkillsService.prototype.findOne = function (id) {
        var skill = this.skillModel.findById(id);
        if (!skill) {
            throw new common_1.BadRequestException('Skill not found');
        }
        return skill;
    };
    SkillsService.prototype.update = function (id, updateSkillDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var isExist, newJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_2["default"].Types.ObjectId.isValid(id)) {
                            throw new common_1.BadRequestException('Skill not found');
                        }
                        return [4 /*yield*/, this.skillModel.findOne({ _id: id })];
                    case 1:
                        isExist = _a.sent();
                        if (!isExist) {
                            throw new common_1.BadRequestException('Skill not found');
                        }
                        newJob = __assign(__assign({}, updateSkillDto), { updatedBy: {
                                _id: user._id,
                                email: user.email
                            } });
                        return [4 /*yield*/, this.skillModel.updateOne({ _id: id }, newJob)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SkillsService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.skillModel.findOne({ _id: id })];
                    case 1:
                        isExist = _a.sent();
                        if (!isExist) {
                            throw new common_1.BadRequestException('Skill not found');
                        }
                        return [4 /*yield*/, this.skillModel.softDelete({ _id: id })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SkillsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(skill_schema_1.Skill.name))
    ], SkillsService);
    return SkillsService;
}());
exports.SkillsService = SkillsService;
