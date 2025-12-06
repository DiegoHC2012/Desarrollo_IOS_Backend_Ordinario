import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { UpdateGradeUseCase } from "../useCase/updateGradeUseCase";

@injectable()
export class UpdateGradeAdapter {
  constructor(
    @inject(UpdateGradeUseCase) private useCase: UpdateGradeUseCase
  ) {}

  async execute(req: Request) {
    const { institutionId, studentId, subjectId, gradeId } = req.params;
    return await this.useCase.execute(institutionId, studentId, subjectId, gradeId, req.body);
  }
}
