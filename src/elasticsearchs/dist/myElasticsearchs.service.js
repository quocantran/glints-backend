"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.MyElasticsearchsService = void 0;
var common_1 = require("@nestjs/common");
var MyElasticsearchsService = /** @class */ (function () {
    function MyElasticsearchsService(elasticsearchsService, companieService, jobsService) {
        this.elasticsearchsService = elasticsearchsService;
        this.companieService = companieService;
        this.jobsService = jobsService;
    }
    MyElasticsearchsService.prototype.search = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, index, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = data.index, query = data.query;
                        return [4 /*yield*/, this.elasticsearchsService.search({
                                index: index,
                                body: {
                                    query: {
                                        wildcard: {
                                            name: "*" + query + "*"
                                        }
                                    },
                                    size: parseInt(data.size) || 50,
                                    from: parseInt(data.from) || 0
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        if (!(res.body.hits.hits.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.elasticsearchsService.search({
                                index: index,
                                body: {
                                    query: {
                                        match: {
                                            name: query
                                        }
                                    },
                                    size: parseInt(data.size) || 50,
                                    from: parseInt(data.from) || 0
                                }
                            })];
                    case 2:
                        res = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, res.body.hits];
                }
            });
        });
    };
    MyElasticsearchsService.prototype["delete"] = function (index, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elasticsearchsService["delete"]({
                            index: index,
                            id: id
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyElasticsearchsService.prototype.getMapping = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elasticsearchsService.indices.getMapping({
                            index: index
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyElasticsearchsService.prototype.createDocument = function (index, document) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = document._id, body = __rest(document, ["_id"]);
                        console.log(_id);
                        return [4 /*yield*/, this.elasticsearchsService.index({
                                index: index,
                                id: _id,
                                body: body,
                                refresh: 'wait_for'
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyElasticsearchsService.prototype.getDocumentsPaginate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isExist, index, from, size, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elasticsearchsService.indices.exists({
                            index: data.index
                        })];
                    case 1:
                        isExist = _a.sent();
                        if (!isExist) {
                            throw new common_1.BadRequestException('Index not found!');
                        }
                        index = data.index, from = data.from, size = data.size;
                        return [4 /*yield*/, this.elasticsearchsService.search({
                                index: index,
                                body: {
                                    query: {
                                        match_all: {}
                                    }
                                },
                                from: parseInt(from),
                                size: parseInt(size)
                            })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.body.hits];
                }
            });
        });
    };
    MyElasticsearchsService = __decorate([
        common_1.Injectable()
    ], MyElasticsearchsService);
    return MyElasticsearchsService;
}());
exports.MyElasticsearchsService = MyElasticsearchsService;
