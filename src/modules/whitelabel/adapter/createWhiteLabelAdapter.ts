import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { CreateWhiteLabelUseCase } from "../useCase/createWhiteLabelUseCase";

@injectable()
export class CreateWhiteLabelAdapter {
  constructor(
    @inject(CreateWhiteLabelUseCase) private useCase: CreateWhiteLabelUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId, req.body);
  }
}
