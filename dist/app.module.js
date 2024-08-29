"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const soft_delete_plugin_mongoose_1 = require("soft-delete-plugin-mongoose");
const companies_module_1 = require("./companies/companies.module");
const jobs_module_1 = require("./jobs/jobs.module");
const files_module_1 = require("./files/files.module");
const resumes_module_1 = require("./resumes/resumes.module");
const permissions_module_1 = require("./permissions/permissions.module");
const roles_module_1 = require("./roles/roles.module");
const throttler_1 = require("@nestjs/throttler");
const mail_module_1 = require("./mail/mail.module");
const subscribers_module_1 = require("./subscribers/subscribers.module");
const skills_module_1 = require("./skills/skills.module");
const schedule_1 = require("@nestjs/schedule");
const otps_module_1 = require("./otps/otps.module");
const gatewaies_module_1 = require("./gatewaies/gatewaies.module");
const chats_module_1 = require("./chats/chats.module");
const notifications_module_1 = require("./notifications/notifications.module");
const microservices_1 = require("@nestjs/microservices");
const elasticsearchs_module_1 = require("./elasticsearchs/elasticsearchs.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const redisStore = __importStar(require("cache-manager-redis-store"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule.forRoot()],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URL'),
                    connectionFactory: (connection) => {
                        connection.plugin(soft_delete_plugin_mongoose_1.softDeletePlugin);
                        return connection;
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            cache_manager_1.CacheModule.registerAsync({
                useFactory: async (configService) => ({
                    store: redisStore,
                    ttl: 60 * 1000,
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                }),
                inject: [config_1.ConfigService],
                isGlobal: true,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 10,
                },
            ]),
            auth_module_1.AuthModule,
            companies_module_1.CompaniesModule,
            jobs_module_1.JobsModule,
            files_module_1.FilesModule,
            resumes_module_1.ResumesModule,
            permissions_module_1.PermissionsModule,
            roles_module_1.RolesModule,
            mail_module_1.MailModule,
            otps_module_1.OtpsModule,
            subscribers_module_1.SubscribersModule,
            skills_module_1.SkillsModule,
            otps_module_1.OtpsModule,
            gatewaies_module_1.GatewaiesModule,
            chats_module_1.ChatsModule,
            notifications_module_1.NotificationsModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'RABBITMQ_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost'],
                        queue: 'noti-queue',
                        queueOptions: {
                            durable: false,
                        },
                    },
                },
            ]),
            elasticsearchs_module_1.ElasticsearchsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map