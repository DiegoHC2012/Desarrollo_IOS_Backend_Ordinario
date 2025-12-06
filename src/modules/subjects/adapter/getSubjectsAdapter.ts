import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetSubjectsUseCase } from "../useCase/getSubjectsUseCase";

@injectable()
export class GetSubjectsAdapter {
  constructor(
    @inject(GetSubjectsUseCase)
    private useCase: GetSubjectsUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId, req.params.studentId);
  }
}
