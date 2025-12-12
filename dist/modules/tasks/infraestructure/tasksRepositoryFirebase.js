"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepositoryFirebase = void 0;
const tsyringe_1 = require("tsyringe");
const firebase_1 = require("../../../config/firebase");
let TasksRepositoryFirebase = class TasksRepositoryFirebase {
    async getTasks(institutionId, studentId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/tasks/${studentId}`);
        const snapshot = await ref.get();
        if (!snapshot.exists())
            return [];
        return Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data
        }));
    }
    async getTask(institutionId, studentId, taskId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/tasks/${studentId}/${taskId}`);
        const snapshot = await ref.get();
        return snapshot.exists() ? { id: taskId, ...snapshot.val() } : null;
    }
    async createTask(institutionId, studentId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/tasks/${studentId}`).push();
        await ref.set(data);
        return ref.key;
    }
    async updateTask(institutionId, studentId, taskId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/tasks/${studentId}/${taskId}`);
        await ref.update(data);
    }
    async deleteTask(institutionId, studentId, taskId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/tasks/${studentId}/${taskId}`);
        await ref.remove();
    }
};
exports.TasksRepositoryFirebase = TasksRepositoryFirebase;
exports.TasksRepositoryFirebase = TasksRepositoryFirebase = __decorate([
    (0, tsyringe_1.injectable)()
], TasksRepositoryFirebase);
