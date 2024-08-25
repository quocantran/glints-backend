import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { SearchJobDto } from './dto/search-job.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class JobsService {
    private readonly jobModel;
    private readonly client;
    constructor(jobModel: SoftDeleteModel<JobDocument>, client: ClientProxy);
    create(createJobDto: CreateJobDto, user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Job> & Job & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
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
