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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchsController = void 0;
const common_1 = require("@nestjs/common");
const myElasticsearchs_service_1 = require("./myElasticsearchs.service");
const search_elasticsearch_dto_1 = require("./dto/search-elasticsearch.dto");
const get_paginate_elasticsearch_dto_1 = require("./dto/get-paginate-elasticsearch.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ElasticsearchsController = class ElasticsearchsController {
    constructor(elasticsearchsService) {
        this.elasticsearchsService = elasticsearchsService;
    }
    async getDocumentsPaginate(body) {
        return await this.elasticsearchsService.getDocumentsPaginate(body);
    }
    async search(body) {
        return await this.elasticsearchsService.search(body);
    }
    async delete(index, id) {
        return await this.elasticsearchsService.delete(index, id);
    }
    async getMapping(index) {
        return await this.elasticsearchsService.getMapping(index);
    }
    async createDocument(body) {
        return await this.elasticsearchsService.createDocument(body.index, body.document);
    }
};
__decorate([
    (0, common_1.Post)('get-paginate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_paginate_elasticsearch_dto_1.GetPaginateElasticsearchDto]),
    __metadata("design:returntype", Promise)
], ElasticsearchsController.prototype, "getDocumentsPaginate", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_elasticsearch_dto_1.SearchElasticsearchDto]),
    __metadata("design:returntype", Promise)
], ElasticsearchsController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:index/:id'),
    __param(0, (0, common_1.Param)('index')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ElasticsearchsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':index/_mapping'),
    __param(0, (0, common_1.Param)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ElasticsearchsController.prototype, "getMapping", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ElasticsearchsController.prototype, "createDocument", null);
ElasticsearchsController = __decorate([
    (0, common_1.Controller)('elasticsearchs'),
    __metadata("design:paramtypes", [myElasticsearchs_service_1.MyElasticsearchsService])
], ElasticsearchsController);
exports.ElasticsearchsController = ElasticsearchsController;
//# sourceMappingURL=elasticsearchs.controller.js.map