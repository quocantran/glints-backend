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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth Controller')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private roleSrvice: RolesService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      example: {
        username: 'test@gmail.com',
        password: '123456',
      },
    },
  })
  @Post('/login')
  handleLogin(
    @Req() req: Request & { user: IUser },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(req.user, res);
  }
  @Public()
  @ApiOperation({ summary: 'Register' })
  @Post('/register')
  handleRegister(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get account user' })
  @ApiBearerAuth()
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

  @ApiOperation({
    summary: 'Refresh token',
    description: 'Refresh token, need refresh token in cookies',
  })
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
  @ApiOperation({ summary: 'Logout', description: 'Logout user' })
  @ApiBearerAuth()
  @Post('/logout')
  handleLogout(@Res({ passthrough: true }) res: Response, @User() user: IUser) {
    return this.authService.logout(user, res);
  }
}
