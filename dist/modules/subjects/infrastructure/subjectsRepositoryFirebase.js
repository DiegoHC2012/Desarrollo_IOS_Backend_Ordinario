"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsRepositoryFirebase = void 0;
const tsyringe_1 = require("tsyringe");
const firebase_1 = require("../../../config/firebase");
let SubjectsRepositoryFirebase = class SubjectsRepositoryFirebase {
    async getSubjects(institutionId, studentId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/subjects/${studentId}`);
        const snapshot = await ref.get();
        if (!snapshot.exists())
            return [];
        return Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
        }));
    }
    async getSubject(institutionId, studentId, subjectId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/subjects/${studentId}/${subjectId}`);
        const snapshot = await ref.get();
        return snapshot.exists() ? { id: subjectId, ...snapshot.val() } : null;
    }
    async createSubject(institutionId, studentId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/subjects/${studentId}`).push();
        await ref.set(data);
        return ref.key;
    }
    async updateSubject(institutionId, studentId, subjectId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/subjects/${studentId}/${subjectId}`);
        await ref.update(data);
    }
    async deleteSubject(institutionId, studentId, subjectId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/subjects/${studentId}/${subjectId}`);
        await ref.remove();
    }
};
exports.SubjectsRepositoryFirebase = SubjectsRepositoryFirebase;
exports.SubjectsRepositoryFirebase = SubjectsRepositoryFirebase = __decorate([
    (0, tsyringe_1.injectable)()
], SubjectsRepositoryFirebase);
