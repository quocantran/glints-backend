import { Module } from '@nestjs/common';
import { MyElasticsearchsService } from './myElasticsearchs.service';
import { ElasticsearchsController } from './elasticsearchs.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { CompaniesModule } from 'src/companies/companies.module';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get<string>('ELASTICSEARCH_USERNAME'),
          password: configService.get<string>('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),

    CompaniesModule,
    JobsModule,
  ],

  controllers: [ElasticsearchsController],
  providers: [MyElasticsearchsService],
  exports: [ElasticsearchsModule],
})
export class ElasticsearchsModule {}
