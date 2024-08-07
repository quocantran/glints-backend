import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop()
    content: string;

    @Prop({ enum: ['text', 'image'] })
    type: string;

    @Prop()
    fileUrl: string;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
