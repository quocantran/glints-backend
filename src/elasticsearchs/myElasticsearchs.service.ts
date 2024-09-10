import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CompaniesService } from 'src/companies/companies.service';
import { JobsService } from 'src/jobs/jobs.service';
import { SearchElasticsearchDto } from './dto/search-elasticsearch.dto';
import { GetPaginateElasticsearchDto } from './dto/get-paginate-elasticsearch.dto';

@Injectable()
export class MyElasticsearchsService {
  constructor(
    private readonly elasticsearchsService: ElasticsearchService,
    private readonly companieService: CompaniesService,
    private readonly jobsService: JobsService,
  ) {}

  async search(data: SearchElasticsearchDto) {
    let res;
    const { index, query } = data;
    res = await this.elasticsearchsService.search({
      index,
      body: {
        query: {
          wildcard: {
            name: `*${query}*`,
          },
        },
        size: parseInt(data.size) || 50,
        from: parseInt(data.from) || 0,
      },
    });

    if (res.body.hits.hits.length === 0) {
      res = await this.elasticsearchsService.search({
        index,
        body: {
          query: {
            match: {
              name: query,
            },
          },
          size: parseInt(data.size) || 50,
          from: parseInt(data.from) || 0,
        },
      });
    }

    return res.body.hits;
  }

  async delete(index: string, id: string) {
    return await this.elasticsearchsService.delete({
      index,
      id,
    });
  }

  async getMapping(index: string) {
    return await this.elasticsearchsService.indices.getMapping({
      index,
    });
  }
  async createDocument(index: string, document: any) {
    const { _id, ...body } = document;

    return await this.elasticsearchsService.index({
      index,
      id: _id,
      body: body,
      refresh: 'wait_for',
    });
  }

  async getDocumentsPaginate(data: GetPaginateElasticsearchDto) {
    const isExist = await this.elasticsearchsService.indices.exists({
      index: data.index,
    });

    if (!isExist) {
      throw new BadRequestException('Index not found!');
    }
    const { index, from, size } = data;
    const res = await this.elasticsearchsService.search({
      index,
      body: {
        query: {
          match_all: {},
        },
      },
      from: parseInt(from),
      size: parseInt(size),
    });

    return res.body.hits;
  }
}
