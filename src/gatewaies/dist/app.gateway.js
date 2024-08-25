"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var AppGateway = /** @class */ (function () {
    function AppGateway(companiesService) {
        this.clients = new Map();
        this.companieSerivce = companiesService;
    }
    AppGateway.prototype.afterInit = function (server) {
        console.log('Init');
    };
    AppGateway.prototype.handleConnection = function (client) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var req = client.handshake.query.userId;
        var userId;
        if (req) {
            userId = req.split(':')[1];
        }
        if (userId) {
            this.clients.set(userId, client);
        }
    };
    AppGateway.prototype.handleDisconnect = function (client) {
        var userIdToRemove;
        for (var _i = 0, _a = this.clients.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], userId = _b[0], socket = _b[1];
            if (socket.id === client.id) {
                userIdToRemove = userId;
                break;
            }
        }
        if (userIdToRemove) {
            this.clients["delete"](userIdToRemove);
        }
    };
    AppGateway.prototype.handleMessage = function (client, payload) {
        this.server.emit('message', payload);
    };
    AppGateway.prototype.handleTyping = function (client, payload) {
        client.broadcast.emit('typing', payload);
    };
    AppGateway.prototype.handleStopTyping = function (client) {
        client.broadcast.emit('stopTyping');
    };
    AppGateway.prototype.handleSendNotificationFromServer = function (client, payload) {
        return __awaiter(this, void 0, Promise, function () {
            var company_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(payload === null || payload === void 0 ? void 0 : payload.senderId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.companieSerivce.findOne(payload.senderId)];
                    case 1:
                        company_1 = _a.sent();
                        company_1.usersFollow.forEach(function (userId) {
                            var targetClient = _this.clients.get('"' + userId + '"');
                            if (targetClient) {
                                var messages = "C\u00F4ng ty b\u1EA1n \u0111ang theo d\u00F5i " + company_1.name + " \u0111\u00E3 t\u1EA1o m\u1EDBi c\u00F4ng vi\u1EC7c " + payload.jobName + "!";
                                targetClient.emit('notification', {
                                    message: messages,
                                    companyName: company_1.name,
                                    jobId: payload.jobId,
                                    type: 'job'
                                });
                                console.log("Notification sent to userId: " + userId);
                            }
                            else {
                                console.log("User with userId: " + userId + " not found");
                            }
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        websockets_1.WebSocketServer()
    ], AppGateway.prototype, "server");
    __decorate([
        websockets_1.SubscribeMessage('message')
    ], AppGateway.prototype, "handleMessage");
    __decorate([
        websockets_1.SubscribeMessage('typing')
    ], AppGateway.prototype, "handleTyping");
    __decorate([
        websockets_1.SubscribeMessage('stopTyping')
    ], AppGateway.prototype, "handleStopTyping");
    __decorate([
        websockets_1.SubscribeMessage('notification')
    ], AppGateway.prototype, "handleSendNotificationFromServer");
    AppGateway = __decorate([
        websockets_1.WebSocketGateway({
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET', 'POST'],
                credentials: true
            }
        })
    ], AppGateway);
    return AppGateway;
}());
exports.AppGateway = AppGateway;
