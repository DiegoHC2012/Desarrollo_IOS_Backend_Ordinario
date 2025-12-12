"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWhiteLabelAdapter = void 0;
const tsyringe_1 = require("tsyringe");
const updateWhiteLabelUseCase_1 = require("../useCase/updateWhiteLabelUseCase");
let UpdateWhiteLabelAdapter = class UpdateWhiteLabelAdapter {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async execute(req) {
        return await this.useCase.execute(req.params.institutionId, req.body);
    }
};
exports.UpdateWhiteLabelAdapter = UpdateWhiteLabelAdapter;
exports.UpdateWhiteLabelAdapter = UpdateWhiteLabelAdapter = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(updateWhiteLabelUseCase_1.UpdateWhiteLabelUseCase)),
    __metadata("design:paramtypes", [updateWhiteLabelUseCase_1.UpdateWhiteLabelUseCase])
], UpdateWhiteLabelAdapter);
