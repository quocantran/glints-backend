import mongoose, { HydratedDocument } from 'mongoose';
export type ChatDocument = HydratedDocument<Chat>;
export declare class Chat {
    name: string;
    userId: mongoose.Schema.Types.ObjectId;
    content: string;
    type: string;
    fileUrl: string;
    updatedAt: Date;
    createdAt: Date;
    isDeleted: boolean;
    deletedAt: Date;
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
}
export declare const ChatSchema: mongoose.Schema<Chat, mongoose.Model<Chat, any, any, any, mongoose.Document<unknown, any, Chat> & Chat & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Chat, mongoose.Document<unknown, {}, mongoose.FlatRecord<Chat>> & mongoose.FlatRecord<Chat> & {
    _id: mongoose.Types.ObjectId;
}>;
