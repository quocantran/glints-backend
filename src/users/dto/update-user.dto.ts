import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, RegisterUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

class Company {
  @IsOptional()
  _id: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  name: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @Prop()
  role: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @Prop()
  name: string;

  @IsOptional()
  @Prop()
  age: string;

  @IsOptional()
  @Prop()
  gender: string;

  @IsOptional()
  @Prop()
  address: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  repeatedPassword: string;
}
