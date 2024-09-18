import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobsService } from 'src/jobs/jobs.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly subscriberService: SubscribersService,
    private readonly jobsService: JobsService,
    private configService: ConfigService,
  ) {}

  async sendMail(email: string, token: string) {
    const linkVerify = `${this.configService.get<string>(
      'URL_BACKEND',
    )}/api/v1/users/password/forgot-password?token=${token}`;

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
    try {
      const subscribers = await this.subscriberService.getAll();
      const sendMailPromises = subscribers.map(async (subscriber) => {
        const skills = subscriber.skills.map((skill: any) => skill.name);
        const jobs = await this.jobsService.findJobsBySkillName(skills);

        const jobsFormatted = jobs.map((job) => {
          return {
            ...job,
            jobUrl: `${this.configService.get<string>('URL_FRONTEND')}/jobs/${
              job._id
            }`,
          };
        });

        await this.mailerService.sendMail({
          to: subscriber.email,
          from: 'Support Group*',
          subject: 'Gợi ý công việc dành cho bạn',
          template: 'jobs.template.hbs',
          context: {
            name: subscriber.email,
            jobs: jobsFormatted,
            url: this.configService.get<string>('URL_FRONTEND'),
          },
        });
      });

      await Promise.all(sendMailPromises);
    } catch (e) {
      console.log(e);
    }

    return 'Mail sent';
  }
  async sendPasswordResetMail(email: string, password: string) {
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
}
