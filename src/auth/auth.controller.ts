import {
  Controller,
  Post,
  UseGuards,
  Body,
  Res,
  Req,
  Get,
  Logger,
  BadRequestException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesService } from 'src/roles/roles.service';
import {
  Throttle,
  ThrottlerException,
  ThrottlerGuard,
} from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private roleSrvice: RolesService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @Post('/login')
  handleLogin(
    @Req() req: Request & { user: IUser },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(req.user, res);
  }
  @Public()
  @Post('/register')
  handleRegister(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/account')
  async handleAccount(@User() user: IUser) {
    return await this.authService.handleAccount(user);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    Logger.log('googleAuth');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.googleLogin(req, res);
    res.redirect(
      `${this.configService.get<string>('URL_FRONTEND')}/auth/google?token=${
        result.access_token
      }`,
    );
  }

  @Get('/refresh')
  handleRefresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new BadRequestException('Token không hợp lệ!');
    }

    return this.authService.generateNewToken(refreshToken, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  handleLogout(@Res({ passthrough: true }) res: Response, @User() user: IUser) {
    return this.authService.logout(user, res);
  }
}
