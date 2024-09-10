import { MyElasticsearchsService } from './myElasticsearchs.service';
import { SearchElasticsearchDto } from './dto/search-elasticsearch.dto';
import { GetPaginateElasticsearchDto } from './dto/get-paginate-elasticsearch.dto';
import { RmqContext } from '@nestjs/microservices';
export declare class ElasticsearchsController {
    private readonly elasticsearchsService;
    constructor(elasticsearchsService: MyElasticsearchsService);
    getDocumentsPaginate(body: GetPaginateElasticsearchDto): Promise<any>;
    search(body: SearchElasticsearchDto): Promise<any>;
    delete(body: {
        index: string;
        id: string;
    }, context: RmqContext): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
    getMapping(index: string): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
    createDocument(body: {
        index: string;
        document: any;
    }, context: RmqContext): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
}
