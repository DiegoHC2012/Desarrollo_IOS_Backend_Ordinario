import { inject, injectable } from "tsyringe";
import AnnouncementsRepository from "../domain/repository/announcementsRepository";
import CreateAnnouncementBody from "../domain/dto/createAnnouncementBody";

@injectable()
export class CreateAnnouncementUseCase {
  constructor(
    @inject("AnnouncementsRepository") private repo: AnnouncementsRepository
  ) {}

  async execute(institutionId: string, body: CreateAnnouncementBody) {
    const id = await this.repo.createAnnouncement(institutionId, body);
    return { status: 201, data: { id, ...body } };
  }
}
