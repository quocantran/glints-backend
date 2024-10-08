import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CompaniesService } from 'src/companies/companies.service';
import { JobsService } from 'src/jobs/jobs.service';
import { PaymentsService } from 'src/payments/payments.service';
import { FindByJobResumeDto } from 'src/resumes/dto/findbyjob-resume.dto';
import { ResumesService } from 'src/resumes/resumes.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly jobsService: JobsService,
    private readonly companieSerivce: CompaniesService,
    private readonly resumesService: ResumesService,
    private readonly paymentsService: PaymentsService,
  ) {}

  private clients: Map<string, Socket> = new Map();

  afterInit(server: Server) {
    console.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const req = client.handshake.query.userId as string;

    let userId: string;

    if (req) {
      userId = req.split(':')[1];
    }
    if (userId) {
      this.clients.set(userId, client);
    }
  }

  handleDisconnect(client: Socket) {
    let userIdToRemove: string | undefined;
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

  @SubscribeMessage('notification')
  async handleSendNotificationFromServer(
    client: Socket,
    payload: any,
  ): Promise<void> {
    if (payload?.senderId) {
      const company = await this.companieSerivce.findOne(payload.senderId);

      company.usersFollow.forEach((userId) => {
        const targetClient = this.clients.get('"' + userId + '"');
        if (targetClient) {
          const messages = `Công ty bạn đang theo dõi ${company.name} đã tạo mới công việc ${payload.jobName}!`;
          targetClient.emit('notification', {
            message: messages,
            companyName: company.name,
            jobId: payload.jobId,
            type: 'job',
          });
          console.log(`Notification sent to userId: ${userId}`);
        } else {
          console.log(`User with userId: ${userId} not found`);
        }
      });
    }
  }

  @SubscribeMessage('checkPayment')
  async handleCheckPayment(client: Socket, payload: any): Promise<void> {
    const { code } = payload;
    const result = await this.paymentsService.checkPayment({
      code,
      amount: 2000,
    });

    client.emit('checkPayment', result);
  }

  @SubscribeMessage('transactionSuccess')
  async handleTransactionSuccess(client: Socket, payload: any): Promise<void> {
    const { jobId, userId, code } = payload;
    const valid = await this.paymentsService.checkPayment({
      code,
      amount: 2000,
    });

    if (!valid) {
      client.emit('transactionSuccess', {
        message: 'Transaction failed',
        status: 0,
      });
      return;
    }

    await this.jobsService.addPaidUser(jobId, userId);
    client.emit('transactionSuccess', {
      message: 'Transaction success',
      status: 1,
    });
  }
}
