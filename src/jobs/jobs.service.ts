import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { SearchJobDto } from './dto/search-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const newJob = await this.jobModel.create(createJobDto);
    return newJob;
  }

  async findAll(qs: any) {
    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;
      const totalRecord = (await this.jobModel.find(filter)).length;
      const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
      const totalPage = Math.ceil(totalRecord / limit);
      const skip = (qs.current - 1) * limit;
      const current = +qs.current;
      const jobs = await this.jobModel
        .find(filter)
        .populate({
          path: 'company',
          select: {
            name: 1,
            location: 1,
            logo: 1,
            address: 1,
          },
        })
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
        result: jobs,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Job not found');
    }

    const job = await this.jobModel.findOne({ _id: id }).populate({
      path: 'company',
      select: {
        name: 1,
        location: 1,
        logo: 1,
        address: 1,
      },
    });
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    const job = {
      ...updateJobDto,
      updatedBy: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    return await this.jobModel.updateOne({ _id: id }, job);
  }

  async remove(id: string) {
    return await this.jobModel.softDelete({ _id: id });
  }

  async search(searchJobDto: SearchJobDto) {
    try {
      const { name, location } = searchJobDto;
      const query: any = {};

      if (name) {
        const regexName = new RegExp(name, 'i').source;
        query.name = { $regex: regexName, $options: 'i' };
      }

      if (location) {
        const regexLocation = new RegExp(location, 'i').source;
        query.location = { $regex: regexLocation, $options: 'i' };
      }

      const jobs = await this.jobModel.find(query).select('name');

      return jobs;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async countJobs() {
    return await this.jobModel.countDocuments();
  }
}
