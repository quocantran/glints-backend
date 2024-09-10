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
const microservices_1 = require("@nestjs/microservices");
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
    async delete(body, context) {
        try {
            return await this.elasticsearchsService.delete(body.index, body.id);
        }
        catch (err) {
            common_1.Logger.error('Error::::::', err);
            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();
            channel.nack(originalMsg, false, false);
        }
    }
    async getMapping(index) {
        return await this.elasticsearchsService.getMapping(index);
    }
    async createDocument(body, context) {
        try {
            return await this.elasticsearchsService.createDocument(body.index, body.document);
        }
        catch (err) {
            common_1.Logger.error('Error::::::', err);
            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();
            channel.nack(originalMsg, false, false);
        }
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
    (0, microservices_1.MessagePattern)('deleteDocument'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
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
    (0, microservices_1.MessagePattern)('createDocument'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], ElasticsearchsController.prototype, "createDocument", null);
ElasticsearchsController = __decorate([
    (0, common_1.Controller)('elasticsearchs'),
    __metadata("design:paramtypes", [myElasticsearchs_service_1.MyElasticsearchsService])
], ElasticsearchsController);
exports.ElasticsearchsController = ElasticsearchsController;
//# sourceMappingURL=elasticsearchs.controller.js.map