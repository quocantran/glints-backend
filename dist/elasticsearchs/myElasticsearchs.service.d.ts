import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CompaniesService } from 'src/companies/companies.service';
import { JobsService } from 'src/jobs/jobs.service';
import { SearchElasticsearchDto } from './dto/search-elasticsearch.dto';
import { GetPaginateElasticsearchDto } from './dto/get-paginate-elasticsearch.dto';
export declare class MyElasticsearchsService {
    private readonly elasticsearchsService;
    private readonly companieService;
    private readonly jobsService;
    constructor(elasticsearchsService: ElasticsearchService, companieService: CompaniesService, jobsService: JobsService);
    search(data: SearchElasticsearchDto): Promise<any>;
    delete(index: string, id: string): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
    getMapping(index: string): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
    createDocument(index: string, document: any): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
    getDocumentsPaginate(data: GetPaginateElasticsearchDto): Promise<any>;
}
