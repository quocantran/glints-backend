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
import { CreateOtpDto } from './dto/create-otp.dto';
import { Otp, OtpDocument } from './schemas/otp.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
export declare class OtpsService {
    private readonly otpModel;
    private userService;
    private readonly mailService;
    constructor(otpModel: SoftDeleteModel<OtpDocument>, userService: UsersService, mailService: MailService);
    create(createOtpDto: CreateOtpDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Otp> & Otp & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Otp> & Otp & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    genarateToken(): number;
    checkToken(token: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Otp> & Otp & {
        _id: import("mongoose").Types.ObjectId;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(token: string): Promise<void>;
}
