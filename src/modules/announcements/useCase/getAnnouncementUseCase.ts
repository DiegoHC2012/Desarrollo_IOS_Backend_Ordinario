import { inject, injectable } from "tsyringe";
import AnnouncementsRepository from "../domain/repository/announcementsRepository";

@injectable()
export class GetAnnouncementUseCase {
  constructor(
    @inject("AnnouncementsRepository") private repo: AnnouncementsRepository
  ) {}

  async execute(institutionId: string, announcementId: string) {
    const announcement = await this.repo.getAnnouncement(institutionId, announcementId);

    if (!announcement)
      return { status: 404, error: "Anuncio no encontrado" };

    return { status: 200, data: announcement };
  }
}
