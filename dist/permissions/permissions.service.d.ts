import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
export declare class PermissionsService {
    private readonly permissionsModel;
    constructor(permissionsModel: SoftDeleteModel<PermissionDocument>);
    create(createPermissionDto: CreatePermissionDto, user: IUser): Promise<{
        id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(qs: any): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Permission> & Permission & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
}
