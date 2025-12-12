"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepositoryFirebase = void 0;
const tsyringe_1 = require("tsyringe");
const firebase_1 = require("../../../config/firebase");
let StudentRepositoryFirebase = class StudentRepositoryFirebase {
    async getStudent(institutionId, studentId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/students/${studentId}`);
        const snapshot = await ref.get();
        return snapshot.exists() ? snapshot.val() : null;
    }
    async getAllStudents(institutionId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/students`);
        const snapshot = await ref.get();
        if (!snapshot.exists())
            return [];
        return Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data
        }));
    }
    async createStudent(institutionId, studentId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/students/${studentId}`);
        await ref.set(data);
    }
    async updateStudent(institutionId, studentId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/students/${studentId}`);
        await ref.update(data);
    }
    async deleteStudent(institutionId, studentId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/students/${studentId}`);
        await ref.remove();
    }
};
exports.StudentRepositoryFirebase = StudentRepositoryFirebase;
exports.StudentRepositoryFirebase = StudentRepositoryFirebase = __decorate([
    (0, tsyringe_1.injectable)()
], StudentRepositoryFirebase);
