"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilesModule = void 0;
var common_1 = require("@nestjs/common");
var files_service_1 = require("./files.service");
var files_controller_1 = require("./files.controller");
var cloudinary_provider_1 = require("./cloudinary.provider");
var FilesModule = /** @class */ (function () {
    function FilesModule() {
    }
    FilesModule = __decorate([
        common_1.Module({
            controllers: [files_controller_1.FilesController],
            providers: [files_service_1.FilesService, cloudinary_provider_1.CloudinaryProvider],
            exports: [cloudinary_provider_1.CloudinaryProvider, files_service_1.FilesService]
        })
    ], FilesModule);
    return FilesModule;
}());
exports.FilesModule = FilesModule;
