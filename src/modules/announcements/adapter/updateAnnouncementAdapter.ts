import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { UpdateAnnouncementUseCase } from "../useCase/updateAnnouncementUseCase";

@injectable()
export class UpdateAnnouncementAdapter {
  constructor(
    @inject(UpdateAnnouncementUseCase) private useCase: UpdateAnnouncementUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.announcementId,
      req.body
    );
  }
}
