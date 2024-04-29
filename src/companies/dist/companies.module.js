"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompaniesModule = void 0;
var common_1 = require("@nestjs/common");
var companies_service_1 = require("./companies.service");
var companies_controller_1 = require("./companies.controller");
var mongoose_1 = require("@nestjs/mongoose");
var company_schema_1 = require("./schemas/company.schema");
var CompaniesModule = /** @class */ (function () {
    function CompaniesModule() {
    }
    CompaniesModule_1 = CompaniesModule;
    var CompaniesModule_1;
    CompaniesModule = CompaniesModule_1 = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: company_schema_1.Company.name, schema: company_schema_1.CompanySchema }]),
            ],
            controllers: [companies_controller_1.CompaniesController],
            providers: [companies_service_1.CompaniesService, CompaniesModule_1],
            exports: [companies_service_1.CompaniesService, CompaniesModule_1]
        })
    ], CompaniesModule);
    return CompaniesModule;
}());
exports.CompaniesModule = CompaniesModule;
