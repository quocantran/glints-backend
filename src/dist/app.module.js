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
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var users_module_1 = require("./users/users.module");
var mongoose_1 = require("@nestjs/mongoose");
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./auth/auth.module");
var soft_delete_plugin_mongoose_1 = require("soft-delete-plugin-mongoose");
var companies_module_1 = require("./companies/companies.module");
var jobs_module_1 = require("./jobs/jobs.module");
var files_module_1 = require("./files/files.module");
var resumes_module_1 = require("./resumes/resumes.module");
var permissions_module_1 = require("./permissions/permissions.module");
var roles_module_1 = require("./roles/roles.module");
var throttler_1 = require("@nestjs/throttler");
var forgot_password_module_1 = require("./forgot-password/forgot-password.module");
var mail_module_1 = require("./mail/mail.module");
var subscribers_module_1 = require("./subscribers/subscribers.module");
var skills_module_1 = require("./skills/skills.module");
var schedule_1 = require("@nestjs/schedule");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                users_module_1.UsersModule,
                schedule_1.ScheduleModule.forRoot(),
                mongoose_1.MongooseModule.forRootAsync({
                    imports: [config_1.ConfigModule.forRoot()],
                    useFactory: function (configService) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ({
                                    uri: configService.get('MONGODB_URL'),
                                    connectionFactory: function (connection) {
                                        connection.plugin(soft_delete_plugin_mongoose_1.softDeletePlugin);
                                        return connection;
                                    }
                                })];
                        });
                    }); },
                    inject: [config_1.ConfigService]
                }),
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                //config limits rate
                throttler_1.ThrottlerModule.forRoot([
                    {
                        ttl: 60000,
                        limit: 10
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
            exports: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
