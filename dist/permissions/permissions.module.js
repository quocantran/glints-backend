"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PermissionsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsModule = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const permissions_controller_1 = require("./permissions.controller");
const mongoose_1 = require("@nestjs/mongoose");
const permission_schema_1 = require("./schemas/permission.schema");
let PermissionsModule = PermissionsModule_1 = class PermissionsModule {
};
PermissionsModule = PermissionsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: permission_schema_1.Permission.name, schema: permission_schema_1.PermissionSchema },
            ]),
        ],
        controllers: [permissions_controller_1.PermissionsController],
        providers: [permissions_service_1.PermissionsService],
        exports: [permissions_service_1.PermissionsService, PermissionsModule_1],
    })
], PermissionsModule);
exports.PermissionsModule = PermissionsModule;
//# sourceMappingURL=permissions.module.js.map