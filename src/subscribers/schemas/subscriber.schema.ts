import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from 'src/permissions/schemas/permission.schema';
export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({ timestamps: true })
export class Subscriber {
    @Prop()
    email: string;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Skill' })
    skills: mongoose.Schema.Types.ObjectId[];

    @Prop()
    isActive: boolean;

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

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
