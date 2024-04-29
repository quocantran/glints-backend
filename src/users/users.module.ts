import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { LocalStrategy } from 'src/auth/passport/local.strategy';
import { ForgotPasswordModule } from 'src/forgot-password/forgot-password.module';
import { ForgotPasswordService } from 'src/forgot-password/forgot-password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ForgotPasswordModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule],
})
export class UsersModule {}
