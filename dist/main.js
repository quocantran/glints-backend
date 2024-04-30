"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./core/transform.interceptor");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const path_1 = require("path");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.use((0, serve_static_1.default)((0, path_1.join)(__dirname, '..', 'public')));
    app.setGlobalPrefix('api');
    app.use((0, cookie_parser_1.default)());
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: ['1', '2'],
    });
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    const PORT = configService.get('PORT');
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map