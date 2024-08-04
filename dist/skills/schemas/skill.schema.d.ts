import mongoose, { HydratedDocument } from 'mongoose';
export type SkillDocument = HydratedDocument<Skill>;
export declare class Skill {
    name: string;
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
export declare const SkillSchema: mongoose.Schema<Skill, mongoose.Model<Skill, any, any, any, mongoose.Document<unknown, any, Skill> & Skill & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Skill, mongoose.Document<unknown, {}, mongoose.FlatRecord<Skill>> & mongoose.FlatRecord<Skill> & {
    _id: mongoose.Types.ObjectId;
}>;
