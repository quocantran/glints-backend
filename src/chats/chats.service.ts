import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { UsersService } from 'src/users/users.service';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: SoftDeleteModel<ChatDocument>,
    private readonly userSerivce: UsersService,
  ) {}

  async create(createChatDto: CreateChatDto, user: IUser) {
    if (!createChatDto.content && !createChatDto.fileUrl) {
      throw new BadRequestException('Content or fileUrl is required');
    }

    const newChat = new this.chatModel({
      content: createChatDto.content,
      user: user._id,
      fileUrl: createChatDto.fileUrl,
    });

    const chat = new this.chatModel(newChat);
    return chat.save();
  }

  async findAll(qs: any) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    if (filter.hasOwnProperty('isDeleted')) {
      delete filter.isDeleted;
    }
    const totalRecord = (await this.chatModel.find(filter)).length;
    const limit = qs.pageSize ? parseInt(qs.pageSize) : 50;
    const totalPage = Math.ceil(totalRecord / limit);
    const current = qs.current ? +qs.current : totalPage;
    const skip = (current - 1) * limit;
    const chats = await this.chatModel
      .find(filter)
      .populate([
        {
          path: 'user',
          select: {
            _id: 1,
            name: 1,
          },
        },
      ])
      .skip(skip)
      .limit(limit)
      .sort(sort as any);

    return {
      meta: {
        current: current,
        pageSize: limit,
        pages: totalPage,
        total: totalRecord,
      },
      result: chats,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Id is invalid');
    }

    const chat = await this.chatModel.findOne({ _id: id });

    if (!chat) {
      throw new BadRequestException('Chat not found');
    }

    if (chat.user.toString() !== user._id.toString()) {
      throw new BadRequestException(
        'You do not have permission to delete this chat',
      );
    }

    return this.chatModel.deleteOne({ _id: id });
  }
}
