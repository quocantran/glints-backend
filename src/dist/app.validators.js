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
exports.CustomUploadFileTypeValidator = void 0;
var common_1 = require("@nestjs/common");
var fileType = require("file-type-mime");
var CustomUploadFileTypeValidator = /** @class */ (function (_super) {
    __extends(CustomUploadFileTypeValidator, _super);
    function CustomUploadFileTypeValidator(validationOptions) {
        var _this = _super.call(this, validationOptions) || this;
        _this.validationOptions = validationOptions;
        _this._allowedMimeTypes = _this.validationOptions.fileType;
        return _this;
    }
    CustomUploadFileTypeValidator.prototype.isValid = function (file) {
        console.log(file);
        if (file && file.buffer) {
            var response = fileType.parse(file.buffer);
            return this._allowedMimeTypes.includes(response.mime);
        }
        else {
            throw new common_1.BadRequestException('File is not valid');
        }
    };
    CustomUploadFileTypeValidator.prototype.buildErrorMessage = function () {
        return "Upload not allowed. Upload only files of type: " + this._allowedMimeTypes.join(', ');
    };
    return CustomUploadFileTypeValidator;
}(common_1.FileValidator));
exports.CustomUploadFileTypeValidator = CustomUploadFileTypeValidator;
