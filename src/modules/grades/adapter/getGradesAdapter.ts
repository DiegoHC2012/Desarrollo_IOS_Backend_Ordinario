import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetGradesUseCase } from "../useCase/getGradesUseCase";

@injectable()
export class GetGradesAdapter {
  constructor(
    @inject(GetGradesUseCase) private useCase: GetGradesUseCase
  ) {}

  async execute(req: Request) {
    const { institutionId, studentId, subjectId } = req.params;
    return await this.useCase.execute(institutionId, studentId, subjectId);
  }
}
