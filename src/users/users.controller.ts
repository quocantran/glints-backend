import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from './users.interface';
import { User } from 'src/decorator/customize';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.create(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() qs: string) {
    return this.usersService.findAll(qs);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser,
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(id, updateUserDto);
  }

  @Get('/password/forgot-password')
  async forgotPassword(@Query('token') token: string, @Res() res: Response) {
    const result = await this.usersService.forgotPassword(token);
    if (result) {
      res.send("Mật khẩu mới đã được gửi về email của bạn!");
    }
  }

  @Get('/record/count')
  countUser() {
    return this.usersService.countUser();
  }
}
