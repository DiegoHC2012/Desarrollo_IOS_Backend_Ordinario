import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetAnnouncementsUseCase } from "../useCase/getAnnouncementsUseCase";

@injectable()
export class GetAnnouncementsAdapter {
  constructor(
    @inject(GetAnnouncementsUseCase) private useCase: GetAnnouncementsUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId);
  }
}
