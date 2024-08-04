import { forwardRef, Module } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { OtpsController } from './otps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema }
    ]),
    forwardRef(() => UsersModule),
    MailModule
  ],
  controllers: [OtpsController],
  providers: [OtpsService],
  exports: [OtpsService, OtpsModule]
})
export class OtpsModule { }
