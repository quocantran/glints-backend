/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { IUser } from './users.interface';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(registerUserDto: RegisterUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateUserDto: UpdateUserDto, user: IUser): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
    updatePassword(id: string, updateUserDto: UpdateUserPasswordDto): Promise<import("mongoose").UpdateWriteOpResult>;
    forgotPassword(token: string, res: Response): Promise<void>;
    countUser(): Promise<number>;
}
