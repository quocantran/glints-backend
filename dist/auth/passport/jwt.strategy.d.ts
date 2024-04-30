import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private roleService;
    constructor(configService: ConfigService, roleService: RolesService);
    validate(payload: IUser): Promise<{
        _id: string;
        name: string;
        email: string;
        role: {
            _id: string;
            name: string;
        };
        companyId: string;
        permissions: any;
    }>;
}
export {};
