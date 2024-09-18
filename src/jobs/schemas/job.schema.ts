import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  skills: string[];

  @Prop({
    type: Object,
    ref: 'Company',
  })
  company: {
    _id: {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Company';
    };
    name: string;
    location: string;
    address: string;
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  paidUsers: mongoose.Schema.Types.ObjectId[];

  @Prop()
  salary: number;

  @Prop()
  level: string;

  @Prop()
  startDate: Date;

  @Prop()
  quantity: number;

  @Prop()
  location: string;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: Boolean;

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

export const JobSchema = SchemaFactory.createForClass(Job);
