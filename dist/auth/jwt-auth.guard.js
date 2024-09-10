"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const customize_1 = require("../decorator/customize");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(customize_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        var _a;
        const req = context.switchToHttp().getRequest();
        let publicApi = [
            '/api/v1/auth/account',
            '/api/v1/auth/logout',
            '/api/v1/users/:id/password',
            '/api/v1/resumes',
            '/api/v1/resumes/by-user',
            '/api/v1/skills',
            '/api/v1/skills/:id',
            '/api/v1/subscribers',
            '/api/v1/subscribers/:id',
            '/api/v1/chats',
            '/api/v1/chats/:id',
            '/api/v1/notifications',
            '/api/v1/companies/follow',
            '/api/v1/companies/unfollow',
            '/api/v1/comments',
            '/api/v1/comments/:id',
        ];
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('Token không hợp lệ!');
        }
        const targetMethod = req.method;
        const targetPath = req.route.path;
        let isPublic = publicApi.some((api) => api === targetPath);
        if (targetPath === '/api/v1/resumes' && targetMethod !== 'POST') {
            isPublic = false;
        }
        if (isPublic)
            return user;
        const userPermissions = (_a = user === null || user === void 0 ? void 0 : user.permissions) !== null && _a !== void 0 ? _a : [];
        const isAllow = userPermissions.find((permission) => {
            return (permission.apiPath === targetPath && permission.method === targetMethod);
        });
        if (!isAllow) {
            throw new common_1.ForbiddenException('Bạn không có quyền truy cập!');
        }
        return user;
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map