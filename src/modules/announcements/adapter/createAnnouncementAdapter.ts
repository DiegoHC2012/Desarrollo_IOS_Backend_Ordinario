import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { CreateAnnouncementUseCase } from "../useCase/createAnnouncementUseCase";

@injectable()
export class CreateAnnouncementAdapter {
  constructor(
    @inject(CreateAnnouncementUseCase) private useCase: CreateAnnouncementUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId, req.body);
  }
}
