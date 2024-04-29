"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateResumeDto = void 0;
var class_validator_1 = require("class-validator");
var CreateResumeDto = /** @class */ (function () {
    function CreateResumeDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Vui lòng tải CV lên!' })
    ], CreateResumeDto.prototype, "url");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsMongoId()
    ], CreateResumeDto.prototype, "companyId");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsMongoId()
    ], CreateResumeDto.prototype, "jobId");
    return CreateResumeDto;
}());
exports.CreateResumeDto = CreateResumeDto;
