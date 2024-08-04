"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOtpDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_otp_dto_1 = require("./create-otp.dto");
class UpdateOtpDto extends (0, mapped_types_1.PartialType)(create_otp_dto_1.CreateOtpDto) {
}
exports.UpdateOtpDto = UpdateOtpDto;
//# sourceMappingURL=update-otp.dto.js.map