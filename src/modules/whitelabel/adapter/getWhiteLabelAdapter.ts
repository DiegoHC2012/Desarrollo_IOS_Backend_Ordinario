import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetWhiteLabelUseCase } from "../useCase/getWhiteLabelUseCase";

@injectable()
export class GetWhiteLabelAdapter {
  constructor(
    @inject(GetWhiteLabelUseCase) private useCase: GetWhiteLabelUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId);
  }
}
