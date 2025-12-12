"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementsRepositoryFirebase = void 0;
const tsyringe_1 = require("tsyringe");
const firebase_1 = require("../../../config/firebase");
let AnnouncementsRepositoryFirebase = class AnnouncementsRepositoryFirebase {
    async getAnnouncements(institutionId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/announcements`);
        const snapshot = await ref.get();
        if (!snapshot.exists())
            return [];
        return Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data
        }));
    }
    async getAnnouncement(institutionId, announcementId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/announcements/${announcementId}`);
        const snapshot = await ref.get();
        return snapshot.exists() ? { id: announcementId, ...snapshot.val() } : null;
    }
    async createAnnouncement(institutionId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/announcements`).push();
        await ref.set(data);
        return ref.key;
    }
    async updateAnnouncement(institutionId, announcementId, data) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/announcements/${announcementId}`);
        await ref.update(data);
    }
    async deleteAnnouncement(institutionId, announcementId) {
        const ref = firebase_1.db.ref(`institutions/${institutionId}/announcements/${announcementId}`);
        await ref.remove();
    }
};
exports.AnnouncementsRepositoryFirebase = AnnouncementsRepositoryFirebase;
exports.AnnouncementsRepositoryFirebase = AnnouncementsRepositoryFirebase = __decorate([
    (0, tsyringe_1.injectable)()
], AnnouncementsRepositoryFirebase);
