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
exports.GetGradesAdapter = void 0;
const tsyringe_1 = require("tsyringe");
const getGradesUseCase_1 = require("../useCase/getGradesUseCase");
let GetGradesAdapter = class GetGradesAdapter {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async execute(req) {
        const { institutionId, studentId, subjectId } = req.params;
        return await this.useCase.execute(institutionId, studentId, subjectId);
    }
};
exports.GetGradesAdapter = GetGradesAdapter;
exports.GetGradesAdapter = GetGradesAdapter = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(getGradesUseCase_1.GetGradesUseCase)),
    __metadata("design:paramtypes", [getGradesUseCase_1.GetGradesUseCase])
], GetGradesAdapter);
