import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill, SkillDocument } from './schemas/skill.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
export declare class SkillsService {
    private readonly skillModel;
    constructor(skillModel: SoftDeleteModel<SkillDocument>);
    create(createSkillDto: CreateSkillDto, user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Skill> & Skill & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Skill> & Skill & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findAll(qs: any): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Skill> & Skill & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Skill> & Skill & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Skill> & Skill & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Skill> & Skill & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Skill> & Skill & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Skill> & Skill & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Skill> & Skill & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    update(id: string, updateSkillDto: UpdateSkillDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
}
