import { injectable } from "tsyringe";
import { db } from "../../../config/firebase";
import AnnouncementsRepository from "../domain/repository/announcementsRepository";
import CreateAnnouncementBody from "../domain/dto/createAnnouncementBody";
import UpdateAnnouncementBody from "../domain/dto/updateAnnouncementBody";

@injectable()
export class AnnouncementsRepositoryFirebase implements AnnouncementsRepository {

  async getAnnouncements(institutionId: string): Promise<any[]> {
    const ref = db.ref(`institutions/${institutionId}/announcements`);
    const snapshot = await ref.get();

    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...(data as any)
    }));
  }

  async getAnnouncement(institutionId: string, announcementId: string): Promise<any> {
    const ref = db.ref(`institutions/${institutionId}/announcements/${announcementId}`);
    const snapshot = await ref.get();
    return snapshot.exists() ? { id: announcementId, ...snapshot.val() } : null;
  }

  async createAnnouncement(institutionId: string, data: CreateAnnouncementBody): Promise<string> {
    const ref = db.ref(`institutions/${institutionId}/announcements`).push();
    await ref.set(data);
    return ref.key!;
  }

  async updateAnnouncement(institutionId: string, announcementId: string, data: UpdateAnnouncementBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/announcements/${announcementId}`);
    await ref.update(data);
  }

  async deleteAnnouncement(institutionId: string, announcementId: string): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/announcements/${announcementId}`);
    await ref.remove();
  }
}
