"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GatewaiesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaiesModule = void 0;
const common_1 = require("@nestjs/common");
const app_gateway_1 = require("./app.gateway");
const companies_module_1 = require("../companies/companies.module");
let GatewaiesModule = GatewaiesModule_1 = class GatewaiesModule {
};
GatewaiesModule = GatewaiesModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [companies_module_1.CompaniesModule],
        providers: [app_gateway_1.AppGateway],
        controllers: [],
        exports: [app_gateway_1.AppGateway, GatewaiesModule_1],
    })
], GatewaiesModule);
exports.GatewaiesModule = GatewaiesModule;
//# sourceMappingURL=gatewaies.module.js.map