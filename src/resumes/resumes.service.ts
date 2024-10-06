import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateStatusResumeDto } from './dto/update-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { FindByJobResumeDto } from './dto/findbyjob-resume.dto';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    readonly resumeModel: SoftDeleteModel<ResumeDocument>,

    private readonly JobService: JobsService,

    private rolesService: RolesService,

    private usersService: UsersService,
  ) {}

  async create(createResumeDto: CreateResumeDto, user: IUser) {
    const isExist = await this.resumeModel.findOne({
      userId: user._id,
      jobId: createResumeDto.jobId,
      status: {
        $ne: 'REJECTED',
      },
    });

    if (isExist) {
      throw new BadRequestException('Bạn đã nộp hồ sơ cho công việc này rồi');
    }

    const resume = {
      ...createResumeDto,
      userId: user._id,
      status: 'PENDING',
      createdBy: {
        _id: user._id,
        email: user.email,
      },
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email,
          },
        },
      ],
    };
    const result = await this.resumeModel.create(resume);
    return {
      _id: result._id,
      createdAt: new Date(),
    };
  }

  async findAll(qs: any, user: IUser) {
    try {
      let { filter, sort, population, projection } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;
      const totalRecord = (await this.resumeModel.find(filter)).length;
      const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
      const totalPage = Math.ceil(totalRecord / limit);
      const skip = (qs.current - 1) * limit;
      const current = +qs.current;
      const roleUser = await this.rolesService.findOne(user.role._id);
      const userInfo = await this.usersService.findOne(user._id);

      if (roleUser.name === 'HR') {
        filter.companyId = userInfo.company._id;
      }

      const resumes = await this.resumeModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .select(projection)
        .sort(sort as any)
        .populate(population);

      return {
        meta: {
          current: current,
          pageSize: limit,
          pages: totalPage,
          total: totalRecord,
        },
        result: resumes,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllByJob(data: FindByJobResumeDto, user: IUser) {
    const { jobId, current, pageSize } = data;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new BadRequestException('not found job');
    }

    const isValid = await this.JobService.findPaidUsers(jobId, user._id);

    if (!isValid) {
      throw new ForbiddenException('Bạn không có quyền truy cập!');
    }

    const limit = pageSize ? parseInt(pageSize) : 10;
    const skip = (parseInt(current) - 1) * limit;
    const totalRecord = (await this.resumeModel.find({ jobId: jobId })).length;
    const totalPage = Math.ceil(totalRecord / limit);
    const resumes = await this.resumeModel
      .find({ jobId: jobId })
      .populate([
        {
          path: 'companyId',
          select: 'name',
        },
        {
          path: 'jobId',
          select: 'name',
        },
      ])
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return {
      meta: {
        current: current ? parseInt(current) : 1,
        pageSize: limit,
        pages: totalPage,
        total: totalRecord,
      },
      result: resumes,
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new NotFoundException('not found resume');

    const resume = await this.resumeModel.findOne({ _id: id });
    return resume;
  }

  async update(
    id: string,
    updateResumeDto: UpdateStatusResumeDto,
    user: IUser,
  ) {
    const newHistory = {
      status: updateResumeDto.status,
      updatedAt: new Date(),
      updatedBy: {
        _id: user._id,
        email: user.email,
      },
    };
    return await this.resumeModel.updateOne(
      { _id: id },
      {
        status: updateResumeDto.status,
        $push: { history: newHistory },
        updatedBy: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    );
  }

  async remove(id: string) {
    return await this.resumeModel.softDelete({ _id: id });
  }

  async findByUser(user: IUser) {
    const userId = user._id;

    const resumes = await this.resumeModel
      .find({
        'createdBy._id': userId,
      })
      .sort('-createdAt')
      .populate([
        {
          path: 'companyId',
          select: {
            name: 1,
          },
        },
        {
          path: 'jobId',
          select: {
            name: 1,
          },
        },
      ]);

    return resumes;
  }
}
