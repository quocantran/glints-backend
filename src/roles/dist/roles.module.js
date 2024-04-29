"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesModule = void 0;
var common_1 = require("@nestjs/common");
var roles_service_1 = require("./roles.service");
var roles_controller_1 = require("./roles.controller");
var mongoose_1 = require("@nestjs/mongoose");
var role_schema_1 = require("./schemas/role.schema");
var RolesModule = /** @class */ (function () {
    function RolesModule() {
    }
    RolesModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: role_schema_1.Role.name, schema: role_schema_1.RoleSchema }]),
            ],
            controllers: [roles_controller_1.RolesController],
            providers: [roles_service_1.RolesService],
            exports: [roles_service_1.RolesService]
        })
    ], RolesModule);
    return RolesModule;
}());
exports.RolesModule = RolesModule;
