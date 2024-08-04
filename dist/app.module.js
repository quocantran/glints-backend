"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const forgot_password_module_1 = require("./forgot-password/forgot-password.module");
const mail_module_1 = require("./mail/mail.module");
const subscribers_module_1 = require("./subscribers/subscribers.module");
const skills_module_1 = require("./skills/skills.module");
const schedule_1 = require("@nestjs/schedule");
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
            forgot_password_module_1.ForgotPasswordModule,
            mail_module_1.MailModule,
            subscribers_module_1.SubscribersModule,
            skills_module_1.SkillsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map