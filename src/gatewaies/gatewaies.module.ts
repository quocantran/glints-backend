import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [CompaniesModule],
  providers: [AppGateway],
  controllers: [],
  exports: [AppGateway, GatewaiesModule],
})
export class GatewaiesModule {}
