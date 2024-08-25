import mongoose, { HydratedDocument } from 'mongoose';
export type CompanyDocument = HydratedDocument<Company>;
export declare class Company {
    name: string;
    description: string;
    address: string;
    updatedAt: Date;
    usersFollow: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    isDeleted: boolean;
    logo: string;
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
export declare const CompanySchema: mongoose.Schema<Company, mongoose.Model<Company, any, any, any, mongoose.Document<unknown, any, Company> & Company & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Company, mongoose.Document<unknown, {}, mongoose.FlatRecord<Company>> & mongoose.FlatRecord<Company> & {
    _id: mongoose.Types.ObjectId;
}>;
