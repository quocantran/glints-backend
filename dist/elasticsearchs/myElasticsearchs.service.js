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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyElasticsearchsService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const companies_service_1 = require("../companies/companies.service");
const jobs_service_1 = require("../jobs/jobs.service");
let MyElasticsearchsService = class MyElasticsearchsService {
    constructor(elasticsearchsService, companieService, jobsService) {
        this.elasticsearchsService = elasticsearchsService;
        this.companieService = companieService;
        this.jobsService = jobsService;
    }
    async search(data) {
        let res;
        const { index, query } = data;
        res = await this.elasticsearchsService.search({
            index,
            body: {
                query: {
                    wildcard: {
                        name: `*${query}*`,
                    },
                },
                size: parseInt(data.size) || 50,
                from: parseInt(data.from) || 0,
            },
        });
        if (res.body.hits.hits.length === 0) {
            res = await this.elasticsearchsService.search({
                index,
                body: {
                    query: {
                        match: {
                            name: query,
                        },
                    },
                    size: parseInt(data.size) || 50,
                    from: parseInt(data.from) || 0,
                },
            });
        }
        return res.body.hits;
    }
    async delete(index, id) {
        return await this.elasticsearchsService.delete({
            index,
            id,
        });
    }
    async getMapping(index) {
        return await this.elasticsearchsService.indices.getMapping({
            index,
        });
    }
    async createDocument(index, document) {
        const { _id } = document, body = __rest(document, ["_id"]);
        console.log(_id);
        return await this.elasticsearchsService.index({
            index,
            id: _id,
            body: body,
            refresh: 'wait_for',
        });
    }
    async getDocumentsPaginate(data) {
        const isExist = await this.elasticsearchsService.indices.exists({
            index: data.index,
        });
        if (!isExist) {
            throw new common_1.BadRequestException('Index not found!');
        }
        const { index, from, size } = data;
        const res = await this.elasticsearchsService.search({
            index,
            body: {
                query: {
                    match_all: {},
                },
            },
            from: parseInt(from),
            size: parseInt(size),
        });
        return res.body.hits;
    }
};
MyElasticsearchsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService,
        companies_service_1.CompaniesService,
        jobs_service_1.JobsService])
], MyElasticsearchsService);
exports.MyElasticsearchsService = MyElasticsearchsService;
//# sourceMappingURL=myElasticsearchs.service.js.map