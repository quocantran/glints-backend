"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var AppGateway = /** @class */ (function () {
    function AppGateway() {
    }
    AppGateway.prototype.afterInit = function (server) {
        console.log('Init');
    };
    AppGateway.prototype.handleConnection = function (client) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("Client connected: " + client.id);
    };
    AppGateway.prototype.handleDisconnect = function (client) {
        console.log("Client disconnected: " + client.id);
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
    AppGateway = __decorate([
        websockets_1.WebSocketGateway({ cors: { origin: "https://glints-app-clone.vercel.app" } })
    ], AppGateway);
    return AppGateway;
}());
exports.AppGateway = AppGateway;
