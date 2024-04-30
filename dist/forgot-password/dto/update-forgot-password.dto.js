"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateForgotPasswordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_forgot_password_dto_1 = require("./create-forgot-password.dto");
class UpdateForgotPasswordDto extends (0, mapped_types_1.PartialType)(create_forgot_password_dto_1.CreateForgotPasswordDto) {
}
exports.UpdateForgotPasswordDto = UpdateForgotPasswordDto;
//# sourceMappingURL=update-forgot-password.dto.js.map