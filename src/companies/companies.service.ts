import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { FollowCompanyDto } from './dto/follow-company.dto';
import { MyElasticsearchsService } from 'src/elasticsearchs/myElasticsearchs.service';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
    @Inject('ELASTIC_SERVICE')
    private readonly client: ClientProxy,

    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const companyExist = await this.companyModel.findOne({
      name: createCompanyDto.name,
    });

    if (companyExist) throw new BadRequestException('Company already exist');

    const newCompany = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    this.client.emit(
      'createDocument',
      Buffer.from(
        JSON.stringify({
          index: 'companies',
          document: newCompany,
        }),
      ),
    );

    return newCompany;
  }

  async getAll() {
    return await this.companyModel.find().lean().exec();
  }

  async findAll(qs: any) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    const totalRecord = (await this.companyModel.find(filter)).length;
    const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
    const totalPage = Math.ceil(totalRecord / limit);
    const skip = (qs.current - 1) * limit;
    const current = +qs.current;
    const companies = await this.companyModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort as any)
      .populate(population);

    return {
      meta: {
        current: current,
        pageSize: limit,
        pages: totalPage,
        total: totalRecord,
      },
      result: companies,
    };
  }

  async followCompany(company: FollowCompanyDto, user: IUser) {
    const { companyId } = company;

    const companyExist = await this.companyModel.findOne({ _id: companyId });

    if (!companyExist) throw new BadRequestException('not found company');

    const userFollow = companyExist.usersFollow.some(
      (item) => item.toString() === user._id.toString(),
    );

    if (userFollow)
      throw new BadRequestException('user already follow company');

    await this.companyModel
      .findByIdAndUpdate(
        company.companyId,
        { $addToSet: { usersFollow: user._id.toString() } },
        { new: true },
      )
      .exec();

    return user._id;
  }

  async unfollowCompany(company: FollowCompanyDto, user: IUser) {
    const { companyId } = company;

    const companyExist = await this.companyModel.findOne({ _id: companyId });

    if (!companyExist) throw new BadRequestException('not found company');

    const userFollow = companyExist.usersFollow.some(
      (item) => item.toString() === user._id.toString(),
    );

    if (!userFollow) throw new BadRequestException('User not follow company');

    await this.companyModel
      .findByIdAndUpdate(
        company.companyId,
        { $pull: { usersFollow: user._id.toString() } },
        { new: true },
      )
      .exec();

    return user._id;
  }

  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id) === false) {
      throw new NotFoundException('not found company');
    }

    const cacheKey = `company-${id}`;

    const cacheData = (await this.cacheManager.get(cacheKey)) as string;

    if (cacheData) {
      return JSON.parse(cacheData);
    }

    const company = await this.companyModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!company) throw new NotFoundException('not found company');

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const updatedCompany = await this.companyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    );

    this.client.emit(
      'createDocument',
      Buffer.from(
        JSON.stringify({
          index: 'companies',
          document: updatedCompany,
        }),
      ),
    );

    return updatedCompany;
  }

  async remove(id: string, user: IUser) {
    const company = await this.companyModel.findOne({
      _id: id,
    });

    if (!company) throw new BadRequestException('Company not found');

    await this.companyModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    );

    this.client.emit(
      'deleteDocument',
      Buffer.from(
        JSON.stringify({
          index: 'companies',
          id: id,
        }),
      ),
    );

    return this.companyModel.softDelete({
      _id: id,
    });
  }

  async countCompanies() {
    return this.companyModel.countDocuments();
  }
}
