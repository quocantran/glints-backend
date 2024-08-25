"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GatewaiesModule = void 0;
var common_1 = require("@nestjs/common");
var app_gateway_1 = require("./app.gateway");
var companies_module_1 = require("src/companies/companies.module");
var GatewaiesModule = /** @class */ (function () {
    function GatewaiesModule() {
    }
    GatewaiesModule_1 = GatewaiesModule;
    var GatewaiesModule_1;
    GatewaiesModule = GatewaiesModule_1 = __decorate([
        common_1.Module({
            imports: [companies_module_1.CompaniesModule],
            providers: [app_gateway_1.AppGateway],
            controllers: [],
            exports: [app_gateway_1.AppGateway, GatewaiesModule_1]
        })
    ], GatewaiesModule);
    return GatewaiesModule;
}());
exports.GatewaiesModule = GatewaiesModule;
