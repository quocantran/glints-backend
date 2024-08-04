"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JwtAuthGuard = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var customize_1 = require("src/decorator/customize");
var JwtAuthGuard = /** @class */ (function (_super) {
    __extends(JwtAuthGuard, _super);
    function JwtAuthGuard(reflector) {
        var _this = _super.call(this) || this;
        _this.reflector = reflector;
        return _this;
    }
    JwtAuthGuard.prototype.canActivate = function (context) {
        var isPublic = this.reflector.getAllAndOverride(customize_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return _super.prototype.canActivate.call(this, context);
    };
    JwtAuthGuard.prototype.handleRequest = function (err, user, info, context) {
        var _a;
        var req = context.switchToHttp().getRequest();
        var publicApi = [
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
            throw err || new common_1.UnauthorizedException('Token không hợp lệ!');
        }
        var targetMethod = req.method;
        var targetPath = req.route.path;
        var isPublic = publicApi.some(function (api) { return api === targetPath; });
        if (targetPath === '/api/v1/resumes' && targetMethod !== 'POST') {
            isPublic = false;
        }
        if (isPublic)
            return user;
        var userPermissions = (_a = user === null || user === void 0 ? void 0 : user.permissions) !== null && _a !== void 0 ? _a : [];
        var isAllow = userPermissions.find(function (permission) {
            return (permission.apiPath === targetPath && permission.method === targetMethod);
        });
        if (!isAllow) {
            throw new common_1.ForbiddenException('Bạn không có quyền truy cập!');
        }
        return user;
    };
    JwtAuthGuard = __decorate([
        common_1.Injectable()
    ], JwtAuthGuard);
    return JwtAuthGuard;
}(passport_1.AuthGuard('jwt')));
exports.JwtAuthGuard = JwtAuthGuard;
