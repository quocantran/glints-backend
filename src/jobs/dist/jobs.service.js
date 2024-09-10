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
exports.JobsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var job_schema_1 = require("./schemas/job.schema");
var api_query_params_1 = require("api-query-params");
var mongoose_2 = require("mongoose");
var cache_manager_1 = require("@nestjs/cache-manager");
var JobsService = /** @class */ (function () {
    function JobsService(jobModel, client, cacheManager) {
        this.jobModel = jobModel;
        this.client = client;
        this.cacheManager = cacheManager;
    }
    JobsService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobModel.find().lean().exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobsService.prototype.create = function (createJobDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var newJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobModel.create(createJobDto)];
                    case 1:
                        newJob = _a.sent();
                        this.client.emit('job_created', {
                            senderId: createJobDto.company._id,
                            content: "C\u00F4ng ty b\u1EA1n \u0111ang theo d\u00F5i " + createJobDto.company.name + " \u0111\u00E3 t\u1EA1o m\u1EDBi c\u00F4ng vi\u1EC7c " + createJobDto.name + "!",
                            type: 'job',
                            options: {
                                jobId: newJob._id
                            }
                        });
                        return [2 /*return*/, newJob];
                }
            });
        });
    };
    JobsService.prototype.findAll = function (qs) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cacheValue, _a, filter, sort, population, totalRecord, limit, totalPage, skip, current, jobs, response, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        cacheKey = JSON.stringify(qs);
                        return [4 /*yield*/, this.cacheManager.get(cacheKey)];
                    case 1:
                        cacheValue = (_b.sent());
                        if (cacheValue) {
                            return [2 /*return*/, JSON.parse(cacheValue)];
                        }
                        _a = api_query_params_1["default"](qs), filter = _a.filter, sort = _a.sort, population = _a.population;
                        delete filter.current;
                        delete filter.pageSize;
                        delete filter.companyId;
                        delete filter.companyName;
                        if (qs.companyId && qs.companyName) {
                            filter.company = {
                                _id: qs.companyId,
                                name: qs.companyName
                            };
                        }
                        return [4 /*yield*/, this.jobModel.find(filter)];
                    case 2:
                        totalRecord = (_b.sent()).length;
                        limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
                        totalPage = Math.ceil(totalRecord / limit);
                        skip = (qs.current - 1) * limit;
                        current = +qs.current;
                        return [4 /*yield*/, this.jobModel
                                .find(filter)
                                .populate({
                                path: 'company',
                                select: {
                                    name: 1,
                                    location: 1,
                                    logo: 1,
                                    address: 1
                                }
                            })
                                .skip(skip)
                                .limit(limit)
                                .sort(sort)];
                    case 3:
                        jobs = _b.sent();
                        response = {
                            meta: {
                                current: current,
                                pageSize: limit,
                                pages: totalPage,
                                total: totalRecord
                            },
                            result: jobs
                        };
                        return [2 /*return*/, response];
                    case 4:
                        err_1 = _b.sent();
                        throw new common_1.BadRequestException(err_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    JobsService.prototype.findJobsBySkillName = function (names) {
        return __awaiter(this, void 0, void 0, function () {
            var regexNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regexNames = names.map(function (name) { return new RegExp(name, 'i'); });
                        return [4 /*yield*/, this.jobModel
                                .find({ skills: { $in: regexNames } })
                                .lean()
                                .exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobsService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_2["default"].Types.ObjectId.isValid(id)) {
                            throw new common_1.NotFoundException('Job not found');
                        }
                        return [4 /*yield*/, this.jobModel
                                .findOne({ _id: id, isDeleted: 'false' })
                                .populate({
                                path: 'company',
                                select: {
                                    name: 1,
                                    location: 1,
                                    logo: 1,
                                    address: 1
                                }
                            })];
                    case 1:
                        job = _a.sent();
                        if (!job) {
                            throw new common_1.BadRequestException('Job not found');
                        }
                        return [2 /*return*/, job];
                }
            });
        });
    };
    JobsService.prototype.update = function (id, updateJobDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_2["default"].Types.ObjectId.isValid(id)) {
                            throw new common_1.NotFoundException('Job not found');
                        }
                        job = __assign(__assign({}, updateJobDto), { updatedBy: {
                                _id: user._id,
                                name: user.name,
                                email: user.email
                            } });
                        return [4 /*yield*/, this.jobModel.updateOne({ _id: id }, job)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobsService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobModel.softDelete({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobsService.prototype.search = function (searchJobDto) {
        return __awaiter(this, void 0, void 0, function () {
            var name, location, query, regexName, regexLocation, jobs, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        name = searchJobDto.name, location = searchJobDto.location;
                        query = {};
                        if (name) {
                            regexName = new RegExp(name, 'i').source;
                            query.name = { $regex: regexName, $options: 'i' };
                        }
                        if (location) {
                            regexLocation = new RegExp(location, 'i').source;
                            query.location = { $regex: regexLocation, $options: 'i' };
                        }
                        return [4 /*yield*/, this.jobModel.find(query).select('name')];
                    case 1:
                        jobs = _a.sent();
                        return [2 /*return*/, jobs];
                    case 2:
                        err_2 = _a.sent();
                        throw new common_1.BadRequestException(err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    JobsService.prototype.countJobs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobModel.countDocuments()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(job_schema_1.Job.name)),
        __param(1, common_1.Inject('NOTI_SERVICE')),
        __param(2, common_1.Inject(cache_manager_1.CACHE_MANAGER))
    ], JobsService);
    return JobsService;
}());
exports.JobsService = JobsService;
