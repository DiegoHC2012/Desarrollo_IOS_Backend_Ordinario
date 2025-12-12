"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesRepositoryFirebase = void 0;
const tsyringe_1 = require("tsyringe");
const firebase_1 = require("../../../config/firebase");
let GradesRepositoryFirebase = class GradesRepositoryFirebase {
    async getGrades(institutionId, studentId, subjectId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}`);
        const snapshot = await ref.get();
        if (!snapshot.exists())
            return [];
        return Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data
        }));
    }
    async getGrade(institutionId, studentId, subjectId, gradeId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}/${gradeId}`);
        const snapshot = await ref.get();
        return snapshot.exists() ? { id: gradeId, ...snapshot.val() } : null;
    }
    async createGrade(institutionId, studentId, subjectId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}`).push();
        await ref.set(data);
        return ref.key;
    }
    async updateGrade(institutionId, studentId, subjectId, gradeId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}/${gradeId}`);
        await ref.update(data);
    }
    async deleteGrade(institutionId, studentId, subjectId, gradeId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}/${gradeId}`);
        await ref.remove();
    }
};
exports.GradesRepositoryFirebase = GradesRepositoryFirebase;
exports.GradesRepositoryFirebase = GradesRepositoryFirebase = __decorate([
    (0, tsyringe_1.injectable)()
], GradesRepositoryFirebase);
