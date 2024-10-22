import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './schemas/skill.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name)
    private readonly skillModel: SoftDeleteModel<SkillDocument>,
  ) {}

  async create(createSkillDto: CreateSkillDto, user: IUser) {
    const isExist = await this.skillModel.findOne({
      name: createSkillDto.name,
    });
    if (isExist) {
      throw new BadRequestException('Skill already exist');
    }
    createSkillDto.name = createSkillDto.name.toUpperCase();

    const result = this.skillModel.create({
      ...createSkillDto,
      createdBy: user.email,
    });
    return result;
  }

  async findAll(qs: any) {
    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;
      const totalRecord = (await this.skillModel.find(filter)).length;
      const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
      const totalPage = Math.ceil(totalRecord / limit);
      const skip = (qs.current - 1) * limit;
      const current = +qs.current;
      const skills = await this.skillModel
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
        result: skills,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Skill not found');
    }
    const skill = this.skillModel.findById(id);
    if (!skill) {
      throw new BadRequestException('Skill not found');
    }
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Skill not found');
    }

    const isExist = await this.skillModel.findOne({ _id: id });
    if (!isExist) {
      throw new BadRequestException('Skill not found');
    }

    const newJob = {
      ...updateSkillDto,
      updatedBy: {
        _id: user._id,
        email: user.email,
      },
    };
    return await this.skillModel.updateOne({ _id: id }, newJob);
  }

  async remove(id: string) {
    const isExist = await this.skillModel.findOne({ _id: id });
    if (!isExist) {
      throw new BadRequestException('Skill not found');
    }
    return await this.skillModel.softDelete({ _id: id });
  }
}
