import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { UpdateWhiteLabelUseCase } from "../useCase/updateWhiteLabelUseCase";

@injectable()
export class UpdateWhiteLabelAdapter {
  constructor(
    @inject(UpdateWhiteLabelUseCase) private useCase: UpdateWhiteLabelUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId, req.body);
  }
}
