import { Controller, Post, Body, Get, UseGuards, Query, Delete, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createChatDto: CreateChatDto, @User() user: IUser) {
        return this.chatsService.create(createChatDto, user);
    }

    @Get()
    async findAll(@Query() qs: string) {
        return await this.chatsService.findAll(qs);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string, @User() user: IUser) {
        return this.chatsService.remove(id, user);
    }
}