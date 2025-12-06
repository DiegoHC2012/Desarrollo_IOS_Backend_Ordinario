import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { DeleteGradeUseCase } from "../useCase/deleteGradeUseCase";

@injectable()
export class DeleteGradeAdapter {
  constructor(
    @inject(DeleteGradeUseCase) private useCase: DeleteGradeUseCase
  ) {}

  async execute(req: Request) {
    const { institutionId, studentId, subjectId, gradeId } = req.params;
    return await this.useCase.execute(institutionId, studentId, subjectId, gradeId);
  }
}
