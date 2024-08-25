import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { IUser } from './users.interface';
import { OtpsService } from 'src/otps/otps.service';
import { MailService } from 'src/mail/mail.service';
export declare class UsersService {
    private userModel;
    private readonly otpService;
    private readonly mailService;
    constructor(userModel: SoftDeleteModel<UserDocument>, otpService: OtpsService, mailService: MailService);
    hashPassword: (password: string) => string;
    checkPassword: (password: string, hash: string) => boolean;
    generateOtp: (length: number) => string;
    create(registerUserDto: RegisterUserDto): Promise<{
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(qs: any): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findUserByUsername(username: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findUserByName(name: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(id: string, updateUserDto: UpdateUserDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
    updateUserToken: (refreshToken: string, _id: string) => Promise<void>;
    updatePassword: (id: string, updateUserDto: UpdateUserPasswordDto) => Promise<mongoose.UpdateWriteOpResult>;
    forgotPassword(token: string): Promise<boolean>;
    countUser(): Promise<number>;
}
