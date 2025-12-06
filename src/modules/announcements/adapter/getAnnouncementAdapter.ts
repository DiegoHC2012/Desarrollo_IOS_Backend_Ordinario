import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetAnnouncementUseCase } from "../useCase/getAnnouncementUseCase";

@injectable()
export class GetAnnouncementAdapter {
  constructor(
    @inject(GetAnnouncementUseCase) private useCase: GetAnnouncementUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId, req.params.announcementId);
  }
}
