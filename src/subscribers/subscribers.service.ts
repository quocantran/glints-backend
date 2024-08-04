import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose, { mongo } from 'mongoose';

@Injectable()
export class SubscribersService {


  constructor(@InjectModel(Subscriber.name)
  private readonly subscriberModel: SoftDeleteModel<SubscriberDocument>

  ) { }

  async create(createSubscriberDto: CreateSubscriberDto) {

    if (createSubscriberDto.skills.length === 0) {
      throw new BadRequestException('Skills is required');
    }

    createSubscriberDto.skills.forEach(skill => {
      if (!mongoose.Types.ObjectId.isValid(skill)) {
        throw new BadRequestException('Skill not found');
      }
    })

    const isExist = await this.subscriberModel.findOne({ email: createSubscriberDto.email });
    if (isExist) {
      throw new BadRequestException('Subscriber already exist');
    }

    const result = await this.subscriberModel.create(createSubscriberDto);
    return result;

  }

  async update(id: string, updateSubscriberDto: UpdateSubscriberDto) {
    updateSubscriberDto.skills.forEach(skill => {
      if (!mongoose.Types.ObjectId.isValid(skill)) {
        throw new BadRequestException('Skill not found');
      }
    })

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Subscriber not found');
    }
    const result = await this.subscriberModel.findByIdAndUpdate(id, updateSubscriberDto, { new: true });
    return result;
  }

  async getAll() {
    const subscribers = await this.subscriberModel.find({}).populate({
      path: 'skills',
      select: {
        _id: 0,
        name: 1
      }
    });
    return subscribers;
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Subscriber not found');
    }
    return this.subscriberModel.softDelete({ _id: id });
  }
}
