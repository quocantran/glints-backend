import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  CacheTTL,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: IUser) {
    return this.commentsService.create(createCommentDto, user);
  }

  @CacheTTL(30)
  @Get()
  findAll(@Query() qs: string) {
    return this.commentsService.findAll(qs);
  }

  @Get('/by-company/:companyId')
  findByCompany(@Param('companyId') companyId: string, @Query() qs: string) {
    return this.commentsService.findByCompany(companyId, qs);
  }
  @Get('/parent/:parentId')
  findByParent(@Param('parentId') parentId: string, @Query() qs: string) {
    return this.commentsService.findByParent(parentId, qs);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.commentsService.remove(id, user);
  }
}
