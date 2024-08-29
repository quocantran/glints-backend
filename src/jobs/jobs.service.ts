import {
  BadRequestException,
  Inject,
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
import { ClientProxy } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: SoftDeleteModel<JobDocument>,

    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAll() {
    return await this.jobModel.find().lean().exec();
  }

  async create(createJobDto: CreateJobDto, user: IUser) {
    const newJob = await this.jobModel.create(createJobDto);

    this.client.emit('job_created', {
      senderId: createJobDto.company._id,
      content: `Công ty bạn đang theo dõi ${createJobDto.company.name} đã tạo mới công việc ${createJobDto.name}!`,
      type: 'job',
      options: {
        jobId: newJob._id,
      },
    });

    return newJob;
  }

  async findAll(qs: any) {
    try {
      const cacheKey = JSON.stringify(qs);

      const cacheValue = (await this.cacheManager.get(cacheKey)) as string;

      if (cacheValue) {
        return JSON.parse(cacheValue);
      }

      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;
      delete filter.companyId;
      delete filter.companyName;

      if (qs.companyId && qs.companyName) {
        filter.company = {
          _id: qs.companyId,
          name: qs.companyName,
        };
      }
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
        .sort(sort as any);

      const response = {
        meta: {
          current: current,
          pageSize: limit,
          pages: totalPage,
          total: totalRecord,
        },
        result: jobs,
      };

      return response;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findJobsBySkillName(names: string[]) {
    const regexNames = names.map((name) => new RegExp(name, 'i'));
    return await this.jobModel
      .find({ skills: { $in: regexNames } })
      .lean()
      .exec();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Job not found');
    }

    const job = await this.jobModel
      .findOne({ _id: id, isDeleted: 'false' })
      .populate({
        path: 'company',
        select: {
          name: 1,
          location: 1,
          logo: 1,
          address: 1,
        },
      });

    if (!job) {
      throw new BadRequestException('Job not found');
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Job not found');
    }

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
