import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';
import { Cache } from '@nestjs/cache-manager';
import aqp from 'api-query-params';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: SoftDeleteModel<CommentDocument>,
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: IUser) {
    const { companyId, content, parentId } = createCommentDto;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      throw new BadRequestException('Invalid company id');
    }

    const comment = new this.commentModel({
      company: companyId,
      content,
      user: user._id.toString(),
      parentId,
    });

    let rightValue: number;

    if (!parentId) {
      const maxRightValue = await this.commentModel.findOne(
        {
          company: new mongoose.Types.ObjectId(companyId),
        },
        'right',
        { sort: { right: -1 } },
      );

      if (maxRightValue) {
        rightValue = maxRightValue.right + 1;
      } else {
        rightValue = 1;
      }
    } else {
      const parentComment = await this.commentModel.findOne({
        _id: parentId,
      });
      if (!parentComment) {
        throw new BadRequestException('Parent comment not found');
      }
      rightValue = parentComment.right;

      await this.commentModel.updateMany(
        {
          company: new mongoose.Types.ObjectId(companyId),
          right: { $gte: rightValue },
        },
        {
          $inc: { right: 2 },
        },
      );
      await this.commentModel.updateMany(
        {
          company: new mongoose.Types.ObjectId(companyId),
          left: { $gt: rightValue },
        },
        {
          $inc: { left: 2 },
        },
      );
    }

    comment.left = rightValue;
    comment.right = rightValue + 1;

    await comment.save();

    return comment.populate({
      path: 'user company',
      select: {
        name: 1,
      },
    });
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
      const totalRecord = (await this.commentModel.find(filter)).length;
      const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
      const totalPage = Math.ceil(totalRecord / limit);
      const skip = (qs.current - 1) * limit;
      const current = +qs.current ? +qs.current : 1;
      const comments = await this.commentModel
        .find(filter)
        .populate({
          path: 'user company',
          select: {
            name: 1,
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
        result: comments,
      };

      return response;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findByParent(parentId: string, qs: any) {
    if (!mongoose.Types.ObjectId.isValid(parentId)) {
      throw new BadRequestException('Invalid company id');
    }
    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;
      filter.parentId = parentId;
      const totalRecord = (await this.commentModel.find(filter)).length;
      const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
      const totalPage = Math.ceil(totalRecord / limit);
      const skip = (qs.current - 1) * limit;
      const current = +qs.current ? +qs.current : 1;
      const comments = await this.commentModel
        .find(filter)
        .populate({
          path: 'user company',
          select: {
            name: 1,
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
        result: comments,
      };

      return response;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findByCompany(companyId: string, qs: any) {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      throw new BadRequestException('Invalid company id');
    }

    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;
      filter.company = companyId;
      filter.parentId = { $exists: false };
      const totalRecord = (await this.commentModel.find(filter)).length;
      const limit = qs.pageSize ? parseInt(qs.pageSize) : 10;
      const totalPage = Math.ceil(totalRecord / limit);
      const skip = (qs.current - 1) * limit;
      const current = +qs.current ? +qs.current : 1;
      const comments = await this.commentModel
        .find(filter)
        .populate({
          path: 'user company',
          select: {
            name: 1,
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
        result: comments,
      };

      return response;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid comment id');
    }

    const comment = await this.commentModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    if (comment.user.toString() !== user._id.toString()) {
      throw new BadRequestException(
        'You are not allowed to delete this comment',
      );
    }

    const leftValue = comment.left;
    const rightValue = comment.right;
    const width = rightValue - leftValue + 1;

    await this.commentModel.deleteMany({
      company: comment.company,
      left: { $gte: leftValue },
      right: { $lte: rightValue },
    });

    await this.commentModel.updateMany(
      {
        company: comment.company,
        left: { $gt: rightValue },
      },
      {
        $inc: { left: -width },
      },
    );

    await this.commentModel.updateMany(
      {
        company: comment.company,
        right: { $gt: rightValue },
      },
      {
        $inc: { right: -width },
      },
    );

    return comment;
  }
}
