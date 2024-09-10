import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JobsService } from 'src/jobs/jobs.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';
export declare class MailService {
    private mailerService;
    private readonly subscriberService;
    private readonly jobsService;
    private configService;
    constructor(mailerService: MailerService, subscriberService: SubscribersService, jobsService: JobsService, configService: ConfigService);
    sendMail(email: string, token: string): Promise<string>;
    sendMailToSubscribers(): Promise<string>;
    sendPasswordResetMail(email: string, password: string): Promise<string>;
}
