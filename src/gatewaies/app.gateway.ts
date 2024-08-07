import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: "https://glints-app-clone.vercel.app" } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('Init');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): void {
        this.server.emit('message', payload);
    }

    @SubscribeMessage('typing')
    handleTyping(client: Socket, payload: any): void {
        client.broadcast.emit('typing', payload);
    }

    @SubscribeMessage('stopTyping')
    handleStopTyping(client: Socket): void {
        client.broadcast.emit('stopTyping');
    }
}