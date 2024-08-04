import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    let publicApi = [
      '/api/v1/auth/account',
      '/api/v1/auth/logout',
      '/api/v1/users/:id/password',
      '/api/v1/resumes',
      '/api/v1/resumes/by-user',
      '/api/v1/skills',
      '/api/v1/skills/:id',
      "/api/v1/subscribers",
      "/api/v1/subscribers/:id",
    ];
    if (err || !user) {
      throw err || new UnauthorizedException('Token không hợp lệ!');
    }
    const targetMethod = req.method;
    const targetPath = req.route.path;
    let isPublic = publicApi.some((api) => api === targetPath);

    if (targetPath === '/api/v1/resumes' && targetMethod !== 'POST') {
      isPublic = false;
    }
    if (isPublic) return user;
    const userPermissions = user?.permissions ?? [];
    const isAllow = userPermissions.find((permission) => {
      return (
        permission.apiPath === targetPath && permission.method === targetMethod
      );
    });
    if (!isAllow) {
      throw new ForbiddenException('Bạn không có quyền truy cập!');
    }
    return user;
  }
}
