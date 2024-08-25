import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop()
  senderId: String;

  @Prop()
  type: String;

  @Prop()
  content: String;

  @Prop()
  receiverId: String;

  @Prop({ type: Object })
  options: {};

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

export const NotificationSchema = SchemaFactory.createForClass(Notification);
