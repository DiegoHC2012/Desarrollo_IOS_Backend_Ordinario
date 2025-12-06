import CreateAnnouncementBody from "../dto/createAnnouncementBody";
import UpdateAnnouncementBody from "../dto/updateAnnouncementBody";

export default interface AnnouncementsRepository {
  getAnnouncements(institutionId: string): Promise<any[]>;
  getAnnouncement(institutionId: string, announcementId: string): Promise<any>;
  createAnnouncement(institutionId: string, data: CreateAnnouncementBody): Promise<string>;
  updateAnnouncement(institutionId: string, announcementId: string, data: UpdateAnnouncementBody): Promise<void>;
  deleteAnnouncement(institutionId: string, announcementId: string): Promise<void>;
}
