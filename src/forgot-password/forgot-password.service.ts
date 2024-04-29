import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ForgotPassword,
  ForgotPasswordDocument,
} from './schemas/forgot-password.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectModel(ForgotPassword.name)
    private forgotPasswordModel: SoftDeleteModel<ForgotPasswordDocument>,

    private mailService: MailService,
  ) {}

  async create(createForgotPasswordDto: CreateForgotPasswordDto) {
    const isExist = await this.forgotPasswordModel.findOne({
      email: createForgotPasswordDto.email,
    });

    if (isExist) {
      throw new ForbiddenException(
        'Vui lòng đợi 3 phút trước khi gửi lại mã OTP',
      );
    }

    const forgotPassword = await this.forgotPasswordModel.create(
      createForgotPasswordDto,
    );

    await this.mailService.sendMail(
      createForgotPasswordDto.email,
      createForgotPasswordDto.otp,
    );

    return forgotPassword;
  }
}
