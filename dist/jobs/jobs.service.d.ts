import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { SearchJobDto } from './dto/search-job.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
export declare class JobsService {
    private readonly jobModel;
    private readonly client;
    private cacheManager;
    constructor(jobModel: SoftDeleteModel<JobDocument>, client: ClientProxy, cacheManager: Cache);
    getAll(): Promise<(mongoose.FlattenMaps<mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    create(createJobDto: CreateJobDto, user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findAll(qs: any): Promise<any>;
    findJobsBySkillName(names: string[]): Promise<(mongoose.FlattenMaps<mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<any>;
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
