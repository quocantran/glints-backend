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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("../jobs/jobs.service");
const subscribers_service_1 = require("../subscribers/subscribers.service");
let MailService = class MailService {
    constructor(mailerService, subscriberService, jobsService) {
        this.mailerService = mailerService;
        this.subscriberService = subscriberService;
        this.jobsService = jobsService;
    }
    async sendMail(email, token) {
        const linkVerify = `http://localhost:8000/api/v1/users/password/forgot-password?token=${token}`;
        await this.mailerService.sendMail({
            to: email,
            from: 'Support Group*',
            subject: 'Mã OTP lấy lại mật khẩu',
            template: 'otp.template.hbs',
            context: {
                linkVerify: linkVerify,
            },
        });
        return 'Mail sent';
    }
    async sendMailToSubscribers() {
        const subscribers = await this.subscriberService.getAll();
        for (const subscriber of subscribers) {
            const skills = subscriber.skills.map((skill) => skill.name);
            const jobs = await this.jobsService.findJobsBySkillName(skills);
            await this.mailerService.sendMail({
                to: subscriber.email,
                from: 'Support Group*',
                subject: 'Gợi ý công việc dành cho bạn',
                template: 'jobs.template.hbs',
                context: {
                    name: subscriber.email,
                    jobs: jobs,
                },
            });
        }
        return "Mail sent";
    }
    async sendPasswordResetMail(email, password) {
        await this.mailerService.sendMail({
            to: email,
            from: 'Support Group*',
            subject: 'Mật khẩu mới',
            template: 'reset-password.template.hbs',
            context: {
                password: password,
            },
        });
        return 'Mail sent';
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService, subscribers_service_1.SubscribersService, jobs_service_1.JobsService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map