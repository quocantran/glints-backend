"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: (configService) => {
        return cloudinary_1.v2.config({
            cloud_name: configService.get('CLOUD_NAME'),
            api_key: configService.get('API_KEY'),
            api_secret: configService.get('API_SECRET'),
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=cloudinary.provider.js.map