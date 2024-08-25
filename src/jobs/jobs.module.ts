import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost'],
          queue: 'noti-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService, JobsModule],
})
export class JobsModule {}
