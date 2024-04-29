"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UpdateCompanyDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var create_company_dto_1 = require("./create-company.dto");
var UpdateCompanyDto = /** @class */ (function (_super) {
    __extends(UpdateCompanyDto, _super);
    function UpdateCompanyDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateCompanyDto;
}(mapped_types_1.PartialType(create_company_dto_1.CreateCompanyDto)));
exports.UpdateCompanyDto = UpdateCompanyDto;
