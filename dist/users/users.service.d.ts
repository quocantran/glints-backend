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
    findOne(id: string): Promise<{
        _id: mongoose.Types.ObjectId;
        __v?: any;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, keyof Paths> & Paths;
        $clone: () => mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        $getAllSubdocs: () => mongoose.Document<any, any, any>[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => mongoose.Document<any, any, any>[];
        $inc: (path: string | string[], val?: number) => mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: mongoose.FlattenMaps<Record<string, unknown>>;
        $markValid: (path: string) => void;
        $model: {
            <ModelType = mongoose.Model<unknown, {}, {}, {}, mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType;
            <ModelType_1 = mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            }, any>>(): ModelType_1;
        };
        $op: "remove" | "validate" | "save";
        $session: (session?: mongoose.mongo.ClientSession) => mongoose.mongo.ClientSession;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: mongoose.DocumentSetOptions): mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>;
            (path: string | Record<string, any>, val: any, options?: mongoose.DocumentSetOptions): mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>;
            (value: string | Record<string, any>): mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>;
        };
        $where: mongoose.FlattenMaps<Record<string, unknown>>;
        baseModelName?: string;
        collection: mongoose.Collection<mongoose.mongo.BSON.Document>;
        db: mongoose.FlattenMaps<mongoose.Connection>;
        deleteOne: (options?: mongoose.QueryOptions<unknown>) => Promise<mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>>;
        depopulate: (path?: string | string[]) => mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        directModifiedPaths: () => string[];
        equals: (doc: mongoose.Document<unknown, any, any>) => boolean;
        errors?: mongoose.Error.ValidationError;
        get: {
            <T extends keyof User>(path: T, type?: any, options?: any): User[T];
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => mongoose.UpdateQuery<mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>>;
        id?: any;
        increment: () => mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        init: (obj: mongoose.AnyObject, opts?: mongoose.AnyObject) => mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        invalidate: {
            <T_1 extends keyof User>(path: T_1, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
        };
        isDirectModified: {
            <T_2 extends keyof User>(path: T_2 | T_2[]): boolean;
            (path: string | string[]): boolean;
        };
        isDirectSelected: {
            <T_3 extends keyof User>(path: T_3): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T_4 extends keyof User>(path: T_4): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T_5 extends keyof User>(path?: T_5 | T_5[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
            (path?: string | string[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T_6 extends keyof User>(path: T_6): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T_7 extends keyof User>(path: T_7, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType_2 = mongoose.Model<unknown, {}, {}, {}, mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_2;
            <ModelType_3 = mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            }, any>>(): ModelType_3;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => string[];
        overwrite: (obj: mongoose.AnyObject) => mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        $parent: () => mongoose.Document<any, any, any>;
        populate: {
            <Paths_1 = {}>(path: string | mongoose.PopulateOptions | (string | mongoose.PopulateOptions)[]): Promise<mongoose.MergeType<mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>, Paths_1>>;
            <Paths_2 = {}>(path: string, select?: string | mongoose.AnyObject, model?: mongoose.Model<any, {}, {}, {}, any, any>, match?: mongoose.AnyObject, options?: mongoose.PopulateOptions): Promise<mongoose.MergeType<mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>, Paths_2>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: mongoose.AnyObject, options?: mongoose.QueryOptions<unknown>) => mongoose.Query<any, mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, {}, mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, "find">;
        save: (options?: mongoose.SaveOptions) => Promise<mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>>;
        schema: mongoose.FlattenMaps<mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            [x: string]: any;
        }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            [x: string]: any;
        }>> & mongoose.FlatRecord<{
            [x: string]: any;
        }> & Required<{
            _id: unknown;
        }>>>;
        set: {
            <T_8 extends keyof User>(path: T_8, val: User[T_8], type: any, options?: mongoose.DocumentSetOptions): mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>;
            (path: string | Record<string, any>, val: any, type: any, options?: mongoose.DocumentSetOptions): mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>;
            (path: string | Record<string, any>, val: any, options?: mongoose.DocumentSetOptions): mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>;
            (value: string | Record<string, any>): mongoose.Document<unknown, {}, User> & User & {
                _id: mongoose.Types.ObjectId;
            } & Required<{
                _id: mongoose.Types.ObjectId;
            }>;
        };
        toJSON: {
            <T_9 = User & {
                _id: mongoose.Types.ObjectId;
            }>(options?: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps?: true;
            }): mongoose.FlattenMaps<T_9>;
            <T_10 = User & {
                _id: mongoose.Types.ObjectId;
            }>(options: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps: false;
            }): T_10;
        };
        toObject: <T_11 = User & {
            _id: mongoose.Types.ObjectId;
        }>(options?: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & Required<{
            _id: unknown;
        }>>) => mongoose.Require_id<T_11>;
        unmarkModified: {
            <T_12 extends keyof User>(path: T_12): void;
            (path: string): void;
        };
        updateOne: (update?: mongoose.UpdateWithAggregationPipeline | mongoose.UpdateQuery<mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>>, options?: mongoose.QueryOptions<unknown>) => mongoose.Query<any, mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, {}, mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, "find">;
        validate: {
            <T_13 extends keyof User>(pathsToValidate?: T_13 | T_13[], options?: mongoose.AnyObject): Promise<void>;
            (pathsToValidate?: mongoose.PathsToValidate, options?: mongoose.AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: mongoose.pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                [k: string]: any;
                pathsToSkip?: mongoose.pathsToSkip;
            }): mongoose.Error.ValidationError;
            <T_14 extends keyof User>(pathsToValidate?: T_14 | T_14[], options?: mongoose.AnyObject): mongoose.Error.ValidationError;
            (pathsToValidate?: mongoose.PathsToValidate, options?: mongoose.AnyObject): mongoose.Error.ValidationError;
        };
        email: string;
        gender: string;
        name: string;
        age: number;
        address: string;
        role: mongoose.FlattenMaps<mongoose.Schema.Types.ObjectId>;
        refreshToken: string;
        company: mongoose.FlattenMaps<{
            _id: mongoose.Schema.Types.ObjectId;
            name: string;
        }>;
        updatedAt: Date;
        createdAt: Date;
        isDeleted: boolean;
        deletedAt: Date;
        createdBy: mongoose.FlattenMaps<{
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        }>;
        updatedBy: mongoose.FlattenMaps<{
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        }>;
        deletedBy: mongoose.FlattenMaps<{
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        }>;
    }>;
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
