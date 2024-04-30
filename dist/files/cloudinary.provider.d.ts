import { ConfigService } from '@nestjs/config';
export declare const CloudinaryProvider: {
    provide: string;
    useFactory: (configService: ConfigService) => import("cloudinary").ConfigOptions;
    inject: (typeof ConfigService)[];
};
