import mongoose, { HydratedDocument } from 'mongoose';
export type JobDocument = HydratedDocument<Job>;
export declare class Job {
    name: string;
    description: string;
    skills: string[];
    company: {
        _id: {
            type: mongoose.Schema.Types.ObjectId;
            ref: 'Company';
        };
        name: string;
        location: string;
        address: string;
    };
    salary: number;
    level: string;
    startDate: Date;
    quantity: number;
    location: string;
    endDate: Date;
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
export declare const JobSchema: mongoose.Schema<Job, mongoose.Model<Job, any, any, any, mongoose.Document<unknown, any, Job> & Job & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Job, mongoose.Document<unknown, {}, mongoose.FlatRecord<Job>> & mongoose.FlatRecord<Job> & {
    _id: mongoose.Types.ObjectId;
}>;
