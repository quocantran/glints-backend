"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobsModule = void 0;
var common_1 = require("@nestjs/common");
var jobs_service_1 = require("./jobs.service");
var jobs_controller_1 = require("./jobs.controller");
var mongoose_1 = require("@nestjs/mongoose");
var job_schema_1 = require("./schemas/job.schema");
var microservices_1 = require("@nestjs/microservices");
var JobsModule = /** @class */ (function () {
    function JobsModule() {
    }
    JobsModule_1 = JobsModule;
    var JobsModule_1;
    JobsModule = JobsModule_1 = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: job_schema_1.Job.name, schema: job_schema_1.JobSchema }]),
                microservices_1.ClientsModule.register([
                    {
                        name: 'RABBITMQ_SERVICE',
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: ['amqp://localhost'],
                            queue: 'noti-queue',
                            queueOptions: {
                                durable: false
                            }
                        }
                    },
                ]),
            ],
            controllers: [jobs_controller_1.JobsController],
            providers: [jobs_service_1.JobsService],
            exports: [jobs_service_1.JobsService, JobsModule_1]
        })
    ], JobsModule);
    return JobsModule;
}());
exports.JobsModule = JobsModule;
