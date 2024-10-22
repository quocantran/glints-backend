import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The role ID of the user',
  })
  @IsNotEmpty({ message: 'Role cannot be empty' })
  @Prop()
  role: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Prop()
  name: string;

  @ApiProperty({
    example: '30',
    description: 'The age of the user',
  })
  @IsNotEmpty({ message: 'Age cannot be empty' })
  @Prop()
  age: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the user',
  })
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  @Prop()
  gender: string;

  @ApiProperty({
    example: 'Ha Noi',
    description: 'The address of the user',
  })
  @IsNotEmpty({ message: 'address cannot be empty' })
  @Prop()
  address: string;

  @ApiProperty({
    example: {
      _id: '60d0fe4f5311236168a109ca',
      name: 'Glints',
    },
    description: 'The company of the user',
  })
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Prop()
  name: string;

  @ApiProperty({
    example: '30',
    description: 'The age of the user',
  })
  @IsNotEmpty({ message: 'Age cannot be empty' })
  @Prop()
  age: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the user',
  })
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  @Prop()
  gender: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The address of the user',
  })
  @IsNotEmpty({ message: 'Address cannot be empty' })
  @Prop()
  address: string;
}
