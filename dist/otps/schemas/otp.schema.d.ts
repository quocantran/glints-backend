import mongoose, { HydratedDocument } from 'mongoose';
export type OtpDocument = HydratedDocument<Otp>;
export declare class Otp {
    email: string;
    token: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
    isDeleted: boolean;
    deletedAt: Date;
    expiredAt: Date;
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
export declare const OtpSchema: mongoose.Schema<Otp, mongoose.Model<Otp, any, any, any, mongoose.Document<unknown, any, Otp> & Otp & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Otp, mongoose.Document<unknown, {}, mongoose.FlatRecord<Otp>> & mongoose.FlatRecord<Otp> & {
    _id: mongoose.Types.ObjectId;
}>;
