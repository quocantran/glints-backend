import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JobsService } from 'src/jobs/jobs.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private readonly subscriberService: SubscribersService, private readonly jobsService: JobsService) { }

  async sendMail(email: string, token: string) {

    const linkVerify = `https://glints-backend.vercel.app/api/v1/users/password/forgot-password?token=${token}`;

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
      const skills = subscriber.skills.map((skill: any) => skill.name);
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
