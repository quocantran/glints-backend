import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UsersService } from 'src/users/users.service';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';
export declare class ChatsService {
    private readonly chatModel;
    private readonly userSerivce;
    constructor(chatModel: SoftDeleteModel<ChatDocument>, userSerivce: UsersService);
    create(createChatDto: CreateChatDto, user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Chat> & Chat & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Chat> & Chat & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findAll(qs: any): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Chat> & Chat & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Chat> & Chat & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: number): string;
    update(id: number, updateChatDto: UpdateChatDto): string;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
