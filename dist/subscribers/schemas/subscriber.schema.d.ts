import mongoose, { HydratedDocument } from 'mongoose';
export type SubscriberDocument = HydratedDocument<Subscriber>;
export declare class Subscriber {
    email: string;
    skills: mongoose.Schema.Types.ObjectId[];
    isActive: boolean;
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
export declare const SubscriberSchema: mongoose.Schema<Subscriber, mongoose.Model<Subscriber, any, any, any, mongoose.Document<unknown, any, Subscriber> & Subscriber & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Subscriber, mongoose.Document<unknown, {}, mongoose.FlatRecord<Subscriber>> & mongoose.FlatRecord<Subscriber> & {
    _id: mongoose.Types.ObjectId;
}>;
