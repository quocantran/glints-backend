/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
export declare class AuthController {
    private readonly authService;
    private roleSrvice;
    constructor(authService: AuthService, roleSrvice: RolesService);
    handleLogin(req: Request & {
        user: IUser;
    }, res: Response): Promise<{
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
    handleRegister(createUserDto: CreateUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    handleAccount(user: IUser): Promise<{
        user: IUser;
    }>;
    handleRefresh(req: Request, res: Response): Promise<{
        access_token: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            role: import("mongoose").Schema.Types.ObjectId;
            permissions: any;
        };
    }>;
    handleLogout(res: Response, user: IUser): Promise<string>;
}
