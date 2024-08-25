import mongoose, { HydratedDocument } from 'mongoose';
export type NotificationDocument = HydratedDocument<Notification>;
export declare class Notification {
    senderId: String;
    type: String;
    content: String;
    receiverId: String;
    options: {};
    isActive: Boolean;
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
export declare const NotificationSchema: mongoose.Schema<Notification, mongoose.Model<Notification, any, any, any, mongoose.Document<unknown, any, Notification> & Notification & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notification, mongoose.Document<unknown, {}, mongoose.FlatRecord<Notification>> & mongoose.FlatRecord<Notification> & {
    _id: mongoose.Types.ObjectId;
}>;
