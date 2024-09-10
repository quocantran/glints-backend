"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const microservices_1 = require("@nestjs/microservices");
const amqp = __importStar(require("amqplib"));
async function bootstrapHttpServer() {
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
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true,
    });
    const PORT = configService.get('PORT');
    await app.listen(PORT);
}
async function setupRabbitMQ() {
    const connection = await amqp.connect(process.env.RMQ_URL);
    const channel = await connection.createChannel();
    const listQueue = [
        process.env.NOTI_QUEUE,
        process.env.ELASTIC_QUEUE,
    ];
    const exchangeName = process.env.EXCHANGE_NAME;
    const exchangeDLX = process.env.EXCHANGE_DLX;
    const exchangeDLXRoutingKey = process.env.ROUTING_KEY_DLX;
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    await Promise.all(listQueue.map(async (queue) => {
        await channel.assertQueue(queue, {
            durable: true,
            exclusive: false,
            arguments: {
                'x-dead-letter-exchange': exchangeDLX,
                'x-dead-letter-routing-key': exchangeDLXRoutingKey,
                'x-message-ttl': 4000,
            },
        });
        await channel.bindQueue(queue, exchangeName, exchangeDLXRoutingKey);
    }));
    await channel.close();
    await connection.close();
}
async function elasticQueue() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.ELASTIC_QUEUE,
            noAck: false,
            queueOptions: {
                durable: true,
                deadLetterExchange: process.env.EXCHANGE_DLX,
                deadLetterRoutingKey: process.env.ROUTING_KEY_DLX,
                messageTtl: 4000,
            },
        },
    });
    await app.listen();
}
async function notiQueue() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.NOTI_QUEUE,
            noAck: false,
            queueOptions: {
                durable: true,
                deadLetterExchange: process.env.EXCHANGE_DLX,
                deadLetterRoutingKey: process.env.ROUTING_KEY_DLX,
                messageTtl: 4000,
            },
        },
    });
    await app.listen();
}
async function bootstrap() {
    await bootstrapHttpServer();
    await setupRabbitMQ();
    await notiQueue();
    await elasticQueue();
}
bootstrap();
//# sourceMappingURL=main.js.map