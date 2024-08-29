import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MyElasticsearchsService } from './myElasticsearchs.service';
import { SearchElasticsearchDto } from './dto/search-elasticsearch.dto';
import { GetPaginateElasticsearchDto } from './dto/get-paginate-elasticsearch.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('elasticsearchs')
export class ElasticsearchsController {
  constructor(
    private readonly elasticsearchsService: MyElasticsearchsService,
  ) {}

  @Post('get-paginate')
  async getDocumentsPaginate(@Body() body: GetPaginateElasticsearchDto) {
    return await this.elasticsearchsService.getDocumentsPaginate(body);
  }

  @Post('search')
  async search(@Body() body: SearchElasticsearchDto) {
    return await this.elasticsearchsService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:index/:id')
  async delete(@Param('index') index: string, @Param('id') id: string) {
    return await this.elasticsearchsService.delete(index, id);
  }

  @Get(':index/_mapping')
  async getMapping(@Param('index') index: string) {
    return await this.elasticsearchsService.getMapping(index);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createDocument(@Body() body: { index: string; document: any }) {
    return await this.elasticsearchsService.createDocument(
      body.index,
      body.document,
    );
  }
}
