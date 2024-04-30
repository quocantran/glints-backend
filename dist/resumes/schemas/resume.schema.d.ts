import mongoose, { HydratedDocument } from 'mongoose';
export type ResumeDocument = HydratedDocument<Resume>;
export declare class Resume {
    email: string;
    userId: mongoose.Schema.Types.ObjectId;
    url: string;
    status: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
    history: {
        status: string;
        updatedAt: Date;
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        };
    }[];
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
export declare const ResumeSchema: mongoose.Schema<Resume, mongoose.Model<Resume, any, any, any, mongoose.Document<unknown, any, Resume> & Resume & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Resume, mongoose.Document<unknown, {}, mongoose.FlatRecord<Resume>> & mongoose.FlatRecord<Resume> & {
    _id: mongoose.Types.ObjectId;
}>;
