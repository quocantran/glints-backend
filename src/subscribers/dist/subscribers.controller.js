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
exports.SubscribersController = void 0;
var common_1 = require("@nestjs/common");
var SubscribersController = /** @class */ (function () {
    function SubscribersController(subscribersService) {
        this.subscribersService = subscribersService;
    }
    SubscribersController.prototype.create = function (createSubscriberDto) {
        return this.subscribersService.create(createSubscriberDto);
    };
    SubscribersController.prototype.update = function (id, updateSubscriberDto) {
        return this.subscribersService.update(id, updateSubscriberDto);
    };
    SubscribersController.prototype.remove = function (id) {
        return this.subscribersService.remove(id);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], SubscribersController.prototype, "create");
    __decorate([
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], SubscribersController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], SubscribersController.prototype, "remove");
    SubscribersController = __decorate([
        common_1.Controller('subscribers')
    ], SubscribersController);
    return SubscribersController;
}());
exports.SubscribersController = SubscribersController;
