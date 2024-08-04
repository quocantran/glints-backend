import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { SearchJobDto } from './dto/search-job.dto';
export declare class JobsService {
    private readonly jobModel;
    constructor(jobModel: SoftDeleteModel<JobDocument>);
    create(createJobDto: CreateJobDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Job> & Job & {
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
        result: Omit<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Job> & Job & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>, never>[];
    }>;
    findJobsBySkillName(names: string[]): Promise<(mongoose.FlattenMaps<mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(id: string, updateJobDto: UpdateJobDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
    search(searchJobDto: SearchJobDto): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    countJobs(): Promise<number>;
}
