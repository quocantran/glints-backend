import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { IUser } from './users.interface';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { OtpsService } from 'src/otps/otps.service';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @Inject(forwardRef(() => OtpsService)) private readonly otpService: OtpsService,
    private readonly mailService: MailService

  ) { }

  hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  checkPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  };

  generateOtp = (length: number) => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  async create(registerUserDto: RegisterUserDto) {
    const isExist = await this.userModel.findOne({
      email: registerUserDto.email,
    });
    if (isExist) {
      throw new BadRequestException('Email already exists');
    }
    registerUserDto.password = this.hashPassword(registerUserDto.password);

    const user = await this.userModel.create(registerUserDto);
    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }

  async findAll(qs: any) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    const totalRecord = (await this.userModel.find(filter)).length;
    const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
    const totalPage = Math.ceil(totalRecord / limit);
    const skip = (qs.current - 1) * limit;
    const current = qs.current ? +qs.current : 1;
    const users = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort as any)
      .select('-password -refreshToken')
      .populate(population);

    return {
      meta: {
        current: current,
        pageSize: limit,
        pages: totalPage,
        total: totalRecord,
      },
      result: users,
    };
  }

  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id) === false)
      throw new NotFoundException('not found user');

    const user = await this.userModel.findOne({ _id: id }).populate({
      path: 'role',
      select: {
        name: 1,
        _id: 1,
      },
    });
    const { password, ...result } = user.toJSON();
    return result;
  }

  async findUserByUsername(username: string) {
    return this.userModel
      .findOne({ email: username, isDeleted: 'false' })
      .populate({
        path: 'role',
        select: {
          name: 1,
          _id: 1,
        },
      });
  }

  async findUserByName(name: string) {
    return await this.userModel.findOne({ name: name });
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    return await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string) {
    return await this.userModel.softDelete({ _id: id });
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    await this.userModel.updateOne({ _id }, { refreshToken });
  };

  updatePassword = async (id: string, updateUserDto: UpdateUserPasswordDto) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('not found user');
    }

    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('not found user');
    }

    if (!this.checkPassword(updateUserDto.password, user.password)) {
      throw new BadRequestException('Current password is incorrect');
    }

    if (updateUserDto.newPassword !== updateUserDto.repeatedPassword) {
      throw new BadRequestException('Password is not match');
    }

    return await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        password: this.hashPassword(updateUserDto.newPassword),
      },
    );
  };

  async forgotPassword(token: string) {

    const user = await this.otpService.checkToken(token);

    if (!user) {
      throw new BadRequestException('Token not found!');
    }

    const existUser = await this.findUserByUsername(user.email);
    if (!existUser) {
      throw new BadRequestException('User not found!');
    }

    const newPassword = this.generateOtp(8);

    const passwordHash = this.hashPassword(newPassword);
    await this.userModel.updateOne({ email: user.email }, { password: passwordHash });
    await this.mailService.sendPasswordResetMail(user.email, newPassword);
    await this.otpService.remove(token);
    return true;
  }

  async countUser() {
    return await this.userModel.countDocuments();
  }
}
