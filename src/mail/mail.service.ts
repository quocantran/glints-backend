import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'Support Group*',
      subject: 'Mã OTP lấy lại mật khẩu',
      template: 'otp.template.hbs',
      context: {
        otp: otp,
      },
    });

    return 'Mail sent';
  }
}
