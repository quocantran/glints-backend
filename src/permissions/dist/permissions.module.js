"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissionsModule = void 0;
var common_1 = require("@nestjs/common");
var permissions_service_1 = require("./permissions.service");
var permissions_controller_1 = require("./permissions.controller");
var mongoose_1 = require("@nestjs/mongoose");
var permission_schema_1 = require("./schemas/permission.schema");
var PermissionsModule = /** @class */ (function () {
    function PermissionsModule() {
    }
    PermissionsModule_1 = PermissionsModule;
    var PermissionsModule_1;
    PermissionsModule = PermissionsModule_1 = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: permission_schema_1.Permission.name, schema: permission_schema_1.PermissionSchema },
                ]),
            ],
            controllers: [permissions_controller_1.PermissionsController],
            providers: [permissions_service_1.PermissionsService],
            exports: [permissions_service_1.PermissionsService, PermissionsModule_1]
        })
    ], PermissionsModule);
    return PermissionsModule;
}());
exports.PermissionsModule = PermissionsModule;
