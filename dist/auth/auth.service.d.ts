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
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RoleDocument } from 'src/roles/schemas/role.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userModel;
    private roleModel;
    private configService;
    private usersService;
    private jwtService;
    constructor(userModel: SoftDeleteModel<UserDocument>, roleModel: SoftDeleteModel<RoleDocument>, configService: ConfigService, usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    generateRefreshToken: (payload: any) => string;
    login(user: IUser, res: Response): Promise<{
        access_token: string;
        user: {
            _id: string;
            email: string;
            name: string;
            role: {
                _id: string;
                name: string;
            };
            permissions: {
                _id: string;
                name: string;
                apiPath: string;
                module: string;
            }[];
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    generateNewToken: (refreshToken: string, res: Response) => Promise<{
        access_token: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            role: import("mongoose").Schema.Types.ObjectId;
            permissions: any;
        };
    }>;
    logout: (user: IUser, res: Response) => Promise<string>;
}
