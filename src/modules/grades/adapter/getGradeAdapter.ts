import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetGradeUseCase } from "../useCase/getGradeUseCase";

@injectable()
export class GetGradeAdapter {
  constructor(
    @inject(GetGradeUseCase) private useCase: GetGradeUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.params.subjectId,
      req.params.gradeId
    );
  }
}
