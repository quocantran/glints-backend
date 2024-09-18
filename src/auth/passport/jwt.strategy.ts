import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private roleService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role, companyId } = payload;
    const data = (await (
      await this.roleService.findOne(role._id)
    ).populate({
      path: 'permissions',
      select: {
        name: 1,
        _id: 1,
        apiPath: 1,
        method: 1,
        module: 1,
      },
    })) as any;

    return {
      _id,
      name,
      email,
      role,
      companyId,
      permissions: data?.permissions ?? [],
    };
  }
}
