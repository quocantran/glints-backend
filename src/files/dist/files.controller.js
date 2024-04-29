"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.FilesController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var FilesController = /** @class */ (function () {
    function FilesController(filesService) {
        this.filesService = filesService;
    }
    FilesController.prototype.uploadFile = function (file) {
        return this.filesService.uploadFile(file);
    };
    __decorate([
        common_1.Post('upload'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('fileUpload')),
        __param(0, common_1.UploadedFile(new common_1.ParseFilePipeBuilder()
            .addFileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/
        })
            .addMaxSizeValidator({
            maxSize: 1024 * 1024
        })
            .build({
            errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY
        })))
    ], FilesController.prototype, "uploadFile");
    FilesController = __decorate([
        common_1.Controller('files')
    ], FilesController);
    return FilesController;
}());
exports.FilesController = FilesController;
