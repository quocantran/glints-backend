import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import ms from 'ms';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    if (user) {
      const isValid = this.usersService.checkPassword(pass, user.password);
      if (isValid) {
        const userRole = user.role;
        const data = (await this.roleModel.findOne({ _id: userRole }).populate({
          path: 'permissions',
          select: {
            name: 1,
            _id: 1,
            apiPath: 1,
            method: 1,
            module: 1,
          },
        })) as any;
        const result = {
          ...user.toObject(),
          permissions: data?.permissions ?? [],
        };
        return result;
      }
    }
    return null;
  }

  generateRefreshToken = (payload: any) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')) / 1000,
    });

    return refreshToken;
  };

  async login(user: IUser, res: Response) {
    const { _id, name, email, role } = user;

    const payload = {
      sub: 'token login',
      iss: 'from server',
      email,
      _id,
      role,
      name,
    };
    const refreshToken = this.generateRefreshToken(payload);

    await this.usersService.updateUserToken(refreshToken, _id);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')) * 1000,
      sameSite: 'none',
      secure: true,
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        email,
        name,
        role,
        permissions: user.permissions,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const isExistEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (isExistEmail) {
      throw new BadRequestException('Email already exists');
    }

    createUserDto.password = this.usersService.hashPassword(
      createUserDto.password,
    );

    const USER_ROLE = 'NORMAL_USER';
    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    const newUser = await this.userModel.create({
      ...createUserDto,
      role: userRole?._id,
    });

    return {
      _id: newUser._id,
      createdAt: newUser.createdAt,
    };
  }

  generateNewToken = async (refreshToken: string, res: Response) => {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userModel.findOne({ refreshToken }).populate({
        path: 'role',
        select: {
          name: 1,
          _id: 1,
        },
      });
      if (user) {
        const { _id, name, email, role } = user;
        const newPayload = {
          sub: 'token login',
          iss: 'from server',
          email,
          _id,
          role,
          name,
        };
        const newRefreshToken = this.generateRefreshToken(newPayload);
        await this.usersService.updateUserToken(
          newRefreshToken,
          _id.toString(),
        );

        const userRole = user.role;
        const data = (await this.roleModel.findOne({ _id: userRole }).populate({
          path: 'permissions',
          select: {
            name: 1,
            _id: 1,
            apiPath: 1,
            method: 1,
            module: 1,
          },
        })) as any;
        res.cookie('refresh_token', newRefreshToken, {
          httpOnly: true,
          maxAge:
            ms(this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')) * 1000,
          sameSite: 'none',
          secure: true,
        });

        return {
          access_token: this.jwtService.sign(newPayload),
          user: {
            _id,
            email,
            name,
            role,
            permissions: data?.permissions ?? [],
          },
        };
      }
    } catch (err) {
      throw new BadRequestException('Invalid refresh token');
    }
  };

  logout = async (user: IUser, res: Response) => {
    await this.usersService.updateUserToken('', user._id);
    res.clearCookie('refresh_token');
    return 'Logout success!';
  };
}
