import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const newCompany = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    return newCompany;
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

  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id) === false)
      throw new NotFoundException('not found company');

    const company = await this.companyModel.findOne({ _id: id });
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
    return updatedCompany;
  }

  async remove(id: string, user: IUser) {
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

    return this.companyModel.softDelete({
      _id: id,
    });
  }

  async countCompanies() {
    return this.companyModel.countDocuments();
  }
}
