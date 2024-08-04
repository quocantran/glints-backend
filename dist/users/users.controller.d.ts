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
import { ForgotPasswordDto } from './dto/forgot-password.dto';
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
    findOne(id: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        __v?: any;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, keyof Paths> & Paths;
        $clone: () => import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        $getAllSubdocs: () => import("mongoose").Document<any, any, any>[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => import("mongoose").Document<any, any, any>[];
        $inc: (path: string | string[], val?: number) => import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
        $markValid: (path: string) => void;
        $model: {
            <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType;
            <ModelType_1 = import("mongoose").Model<import("./schemas/user.schema").User, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, any>>(): ModelType_1;
        };
        $op: "save" | "validate" | "remove";
        $session: (session?: import("mongodb").ClientSession) => import("mongodb").ClientSession;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
        };
        $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions<unknown>) => Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>>;
        depopulate: (path?: string | string[]) => import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        directModifiedPaths: () => string[];
        equals: (doc: import("mongoose").Document<unknown, any, any>) => boolean;
        errors?: import("mongoose").Error.ValidationError;
        get: {
            <T extends keyof import("./schemas/user.schema").User>(path: T, type?: any, options?: any): import("./schemas/user.schema").User[T];
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>>;
        id?: any;
        increment: () => import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        invalidate: {
            <T_1 extends keyof import("./schemas/user.schema").User>(path: T_1, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
        };
        isDirectModified: {
            <T_2 extends keyof import("./schemas/user.schema").User>(path: T_2 | T_2[]): boolean;
            (path: string | string[]): boolean;
        };
        isDirectSelected: {
            <T_3 extends keyof import("./schemas/user.schema").User>(path: T_3): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T_4 extends keyof import("./schemas/user.schema").User>(path: T_4): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T_5 extends keyof import("./schemas/user.schema").User>(path?: T_5 | T_5[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
            (path?: string | string[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T_6 extends keyof import("./schemas/user.schema").User>(path: T_6): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T_7 extends keyof import("./schemas/user.schema").User>(path: T_7, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType_2 = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_2;
            <ModelType_3 = import("mongoose").Model<import("./schemas/user.schema").User, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, any>>(): ModelType_3;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => string[];
        overwrite: (obj: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        $parent: () => import("mongoose").Document<any, any, any>;
        populate: {
            <Paths_1 = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>, Paths_1>>;
            <Paths_2 = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any, {}, {}, {}, any, any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>, Paths_2>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, "find">;
        save: (options?: import("mongoose").SaveOptions) => Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>>;
        schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: string]: any;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            [x: string]: any;
        }>> & import("mongoose").FlatRecord<{
            [x: string]: any;
        }> & Required<{
            _id: unknown;
        }>>>;
        set: {
            <T_8 extends keyof import("./schemas/user.schema").User>(path: T_8, val: import("./schemas/user.schema").User[T_8], type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
        };
        toJSON: {
            <T_9 = import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps?: true;
            }): import("mongoose").FlattenMaps<T_9>;
            <T_10 = import("./schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps: false;
            }): T_10;
        };
        toObject: <T_11 = import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
            _id: unknown;
        }>>) => import("mongoose").Require_id<T_11>;
        unmarkModified: {
            <T_12 extends keyof import("./schemas/user.schema").User>(path: T_12): void;
            (path: string): void;
        };
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>>, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, "find">;
        validate: {
            <T_13 extends keyof import("./schemas/user.schema").User>(pathsToValidate?: T_13 | T_13[], options?: import("mongoose").AnyObject): Promise<void>;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                [k: string]: any;
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): import("mongoose").Error.ValidationError;
            <T_14 extends keyof import("./schemas/user.schema").User>(pathsToValidate?: T_14 | T_14[], options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
        };
        email: string;
        gender: string;
        name: string;
        age: number;
        address: string;
        role: import("mongoose").FlattenMaps<import("mongoose").Schema.Types.ObjectId>;
        refreshToken: string;
        company: import("mongoose").FlattenMaps<{
            _id: import("mongoose").Schema.Types.ObjectId;
            name: string;
        }>;
        updatedAt: Date;
        createdAt: Date;
        isDeleted: boolean;
        deletedAt: Date;
        createdBy: import("mongoose").FlattenMaps<{
            _id: import("mongoose").Schema.Types.ObjectId;
            email: string;
        }>;
        updatedBy: import("mongoose").FlattenMaps<{
            _id: import("mongoose").Schema.Types.ObjectId;
            email: string;
        }>;
        deletedBy: import("mongoose").FlattenMaps<{
            _id: import("mongoose").Schema.Types.ObjectId;
            email: string;
        }>;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, user: IUser): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): Promise<{
        deleted: number;
    }>;
    updatePassword(id: string, updateUserDto: UpdateUserPasswordDto): Promise<import("mongoose").UpdateWriteOpResult>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../forgot-password/schemas/forgot-password.schema").ForgotPassword> & import("../forgot-password/schemas/forgot-password.schema").ForgotPassword & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../forgot-password/schemas/forgot-password.schema").ForgotPassword> & import("../forgot-password/schemas/forgot-password.schema").ForgotPassword & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    countUser(): Promise<number>;
}
