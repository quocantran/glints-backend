"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubscriberDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_subscriber_dto_1 = require("./create-subscriber.dto");
class UpdateSubscriberDto extends (0, mapped_types_1.PartialType)(create_subscriber_dto_1.CreateSubscriberDto) {
}
exports.UpdateSubscriberDto = UpdateSubscriberDto;
//# sourceMappingURL=update-subscriber.dto.js.map