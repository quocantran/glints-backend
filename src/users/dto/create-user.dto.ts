import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

export class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class RegisterUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsNotEmpty({ message: 'role cannot be empty' })
  @Prop()
  role: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'name cannot be empty' })
  @Prop()
  name: string;

  @IsNotEmpty({ message: 'age cannot be empty' })
  @Prop()
  age: string;

  @IsNotEmpty({ message: 'gender cannot be empty' })
  @Prop()
  gender: string;

  @IsNotEmpty({ message: 'address cannot be empty' })
  @Prop()
  address: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}
export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsNotEmpty({ message: 'name cannot be empty' })
  @Prop()
  name: string;

  @IsNotEmpty({ message: 'age cannot be empty' })
  @Prop()
  age: string;

  @IsNotEmpty({ message: 'gender cannot be empty' })
  @Prop()
  gender: string;

  @IsNotEmpty({ message: 'address cannot be empty' })
  @Prop()
  address: string;
}
