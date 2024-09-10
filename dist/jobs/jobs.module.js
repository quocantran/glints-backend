"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JobsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("./jobs.service");
const jobs_controller_1 = require("./jobs.controller");
const mongoose_1 = require("@nestjs/mongoose");
const job_schema_1 = require("./schemas/job.schema");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
let JobsModule = JobsModule_1 = class JobsModule {
};
JobsModule = JobsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: job_schema_1.Job.name, schema: job_schema_1.JobSchema }]),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'NOTI_SERVICE',
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.get('RMQ_URL')],
                            queue: configService.get('NOTI_QUEUE'),
                            noAck: false,
                            queueOptions: {
                                durable: true,
                                arguments: {
                                    'x-message-ttl': 4000,
                                    'x-dead-letter-exchange': configService.get('EXCHANGE_DLX'),
                                    'x-dead-letter-routing-key': configService.get('ROUTING_KEY_DLX'),
                                },
                            },
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [jobs_controller_1.JobsController],
        providers: [jobs_service_1.JobsService],
        exports: [jobs_service_1.JobsService, JobsModule_1],
    })
], JobsModule);
exports.JobsModule = JobsModule;
//# sourceMappingURL=jobs.module.js.map