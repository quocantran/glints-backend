import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schemas/chat.schema';
import { ChatsController } from './chats.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Chat',
        schema: ChatSchema
      }
    ]),
    UsersModule
  ],
  controllers: [ChatsController],
  providers: [ChatsService]
})
export class ChatsModule { }
