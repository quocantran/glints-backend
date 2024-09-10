import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { FollowCompanyDto } from './dto/follow-company.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from '@nestjs/cache-manager';
export declare class CompaniesService {
    private companyModel;
    private readonly client;
    private readonly cacheManager;
    constructor(companyModel: SoftDeleteModel<CompanyDocument>, client: ClientProxy, cacheManager: Cache);
    create(createCompanyDto: CreateCompanyDto, user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Company> & Company & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Company> & Company & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    getAll(): Promise<(mongoose.FlattenMaps<mongoose.Document<unknown, {}, Company> & Company & {
        _id: mongoose.Types.ObjectId;
    }> & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    findAll(qs: any): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Company> & Company & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Company> & Company & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    followCompany(company: FollowCompanyDto, user: IUser): Promise<string>;
    unfollowCompany(company: FollowCompanyDto, user: IUser): Promise<string>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
    countCompanies(): Promise<number>;
}
