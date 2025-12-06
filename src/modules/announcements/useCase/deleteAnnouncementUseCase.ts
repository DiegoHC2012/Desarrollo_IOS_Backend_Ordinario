import { inject, injectable } from "tsyringe";
import AnnouncementsRepository from "../domain/repository/announcementsRepository";

@injectable()
export class DeleteAnnouncementUseCase {
  constructor(
    @inject("AnnouncementsRepository") private repo: AnnouncementsRepository
  ) {}

  async execute(institutionId: string, announcementId: string) {
    await this.repo.deleteAnnouncement(institutionId, announcementId);
    return { status: 200, message: "Anuncio eliminado correctamente" };
  }
}
