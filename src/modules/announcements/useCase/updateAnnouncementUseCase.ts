import { inject, injectable } from "tsyringe";
import AnnouncementsRepository from "../domain/repository/announcementsRepository";
import UpdateAnnouncementBody from "../domain/dto/updateAnnouncementBody";

@injectable()
export class UpdateAnnouncementUseCase {
  constructor(
    @inject("AnnouncementsRepository") private repo: AnnouncementsRepository
  ) {}

  async execute(institutionId: string, announcementId: string, body: UpdateAnnouncementBody) {
    await this.repo.updateAnnouncement(institutionId, announcementId, body);

    return { status: 200, data: { id: announcementId, ...body } };
  }
}
