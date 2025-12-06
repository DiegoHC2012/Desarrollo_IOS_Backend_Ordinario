import { inject, injectable } from "tsyringe";
import AnnouncementsRepository from "../domain/repository/announcementsRepository";

@injectable()
export class GetAnnouncementsUseCase {
  constructor(
    @inject("AnnouncementsRepository") private repo: AnnouncementsRepository
  ) {}

  async execute(institutionId: string) {
    const announcements = await this.repo.getAnnouncements(institutionId);
    return { status: 200, data: announcements };
  }
}
