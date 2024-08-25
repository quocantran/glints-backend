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
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const companies_service_1 = require("../companies/companies.service");
let AppGateway = class AppGateway {
    constructor(companiesService) {
        this.clients = new Map();
        this.companieSerivce = companiesService;
    }
    afterInit(server) {
        console.log('Init');
    }
    handleConnection(client, ...args) {
        const req = client.handshake.query.userId;
        let userId;
        if (req) {
            userId = req.split(':')[1];
        }
        if (userId) {
            this.clients.set(userId, client);
        }
    }
    handleDisconnect(client) {
        let userIdToRemove;
        for (const [userId, socket] of this.clients.entries()) {
            if (socket.id === client.id) {
                userIdToRemove = userId;
                break;
            }
        }
        if (userIdToRemove) {
            this.clients.delete(userIdToRemove);
        }
    }
    handleMessage(client, payload) {
        this.server.emit('message', payload);
    }
    handleTyping(client, payload) {
        client.broadcast.emit('typing', payload);
    }
    handleStopTyping(client) {
        client.broadcast.emit('stopTyping');
    }
    async handleSendNotificationFromServer(client, payload) {
        if (payload === null || payload === void 0 ? void 0 : payload.senderId) {
            const company = await this.companieSerivce.findOne(payload.senderId);
            company.usersFollow.forEach((userId) => {
                const targetClient = this.clients.get('"' + userId + '"');
                if (targetClient) {
                    const messages = `Công ty bạn đang theo dõi ${company.name} đã tạo mới công việc ${payload.jobName}!`;
                    targetClient.emit('notification', {
                        message: messages,
                        companyName: company.name,
                        jobId: payload.jobId,
                        type: 'job'
                    });
                    console.log(`Notification sent to userId: ${userId}`);
                }
                else {
                    console.log(`User with userId: ${userId} not found`);
                }
            });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stopTyping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleStopTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleSendNotificationFromServer", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map