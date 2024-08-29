import { MyElasticsearchsService } from './myElasticsearchs.service';
import { SearchElasticsearchDto } from './dto/search-elasticsearch.dto';
import { GetPaginateElasticsearchDto } from './dto/get-paginate-elasticsearch.dto';
export declare class ElasticsearchsController {
    private readonly elasticsearchsService;
    constructor(elasticsearchsService: MyElasticsearchsService);
    getDocumentsPaginate(body: GetPaginateElasticsearchDto): Promise<any>;
    search(body: SearchElasticsearchDto): Promise<any>;
    delete(index: string, id: string): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
    getMapping(index: string): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
    createDocument(body: {
        index: string;
        document: any;
    }): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, Record<string, unknown>>>;
}
