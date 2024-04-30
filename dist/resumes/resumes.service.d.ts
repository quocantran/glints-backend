import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateStatusResumeDto } from './dto/update-resume.dto';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
export declare class ResumesService {
    readonly resumeModel: SoftDeleteModel<ResumeDocument>;
    private rolesService;
    private usersService;
    constructor(resumeModel: SoftDeleteModel<ResumeDocument>, rolesService: RolesService, usersService: UsersService);
    create(createResumeDto: CreateResumeDto, user: IUser): Promise<{
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(qs: any, user: IUser): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Resume> & Resume & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(id: string, updateResumeDto: UpdateStatusResumeDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
    findByUser(user: IUser): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
}
