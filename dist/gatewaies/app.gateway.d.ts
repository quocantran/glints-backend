import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CompaniesService } from 'src/companies/companies.service';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private companieSerivce;
    constructor(companiesService: CompaniesService);
    private clients;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: any): void;
    handleTyping(client: Socket, payload: any): void;
    handleStopTyping(client: Socket): void;
    handleSendNotificationFromServer(client: Socket, payload: any): Promise<void>;
}
