import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompaniesModule } from 'src/companies/companies.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { JobsModule } from 'src/jobs/jobs.module';
import { ResumesModule } from 'src/resumes/resumes.module';

@Module({
  imports: [CompaniesModule, PaymentsModule, JobsModule, ResumesModule],
  providers: [AppGateway],
  controllers: [],
  exports: [AppGateway, GatewaiesModule],
})
export class GatewaiesModule {}
