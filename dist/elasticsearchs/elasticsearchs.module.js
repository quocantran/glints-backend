"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ElasticsearchsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchsModule = void 0;
const common_1 = require("@nestjs/common");
const myElasticsearchs_service_1 = require("./myElasticsearchs.service");
const elasticsearchs_controller_1 = require("./elasticsearchs.controller");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const config_1 = require("@nestjs/config");
const companies_module_1 = require("../companies/companies.module");
const jobs_module_1 = require("../jobs/jobs.module");
let ElasticsearchsModule = ElasticsearchsModule_1 = class ElasticsearchsModule {
};
ElasticsearchsModule = ElasticsearchsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            elasticsearch_1.ElasticsearchModule.registerAsync({
                useFactory: async (configService) => ({
                    node: configService.get('ELASTICSEARCH_NODE'),
                    auth: {
                        username: configService.get('ELASTICSEARCH_USERNAME'),
                        password: configService.get('ELASTICSEARCH_PASSWORD'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            companies_module_1.CompaniesModule,
            jobs_module_1.JobsModule,
        ],
        controllers: [elasticsearchs_controller_1.ElasticsearchsController],
        providers: [myElasticsearchs_service_1.MyElasticsearchsService],
        exports: [ElasticsearchsModule_1],
    })
], ElasticsearchsModule);
exports.ElasticsearchsModule = ElasticsearchsModule;
//# sourceMappingURL=elasticsearchs.module.js.map