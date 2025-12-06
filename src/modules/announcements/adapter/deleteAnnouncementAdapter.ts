import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { DeleteAnnouncementUseCase } from "../useCase/deleteAnnouncementUseCase";

@injectable()
export class DeleteAnnouncementAdapter {
  constructor(
    @inject(DeleteAnnouncementUseCase) private useCase: DeleteAnnouncementUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.announcementId
    );
  }
}
