import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
export declare class SubscribersService {
    private readonly subscriberModel;
    constructor(subscriberModel: SoftDeleteModel<SubscriberDocument>);
    create(createSubscriberDto: CreateSubscriberDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(id: string, updateSubscriberDto: UpdateSubscriberDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    getAll(): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
}
