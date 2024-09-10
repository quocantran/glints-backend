import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Job } from 'src/jobs/schemas/job.schema';
import { Company } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop()
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  })
  company: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 0 })
  left: number;

  @Prop({ default: 0 })
  right: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Comment.name,
  })
  parentId: mongoose.Schema.Types.ObjectId;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
