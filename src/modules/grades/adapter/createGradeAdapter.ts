import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { CreateGradeUseCase } from "../useCase/createGradeUseCase";

@injectable()
export class CreateGradeAdapter {
  constructor(
    @inject(CreateGradeUseCase) private useCase: CreateGradeUseCase
  ) {}

  async execute(req: Request) {
    const { institutionId, studentId, subjectId } = req.params;
    return await this.useCase.execute(institutionId, studentId, subjectId, req.body);
  }
}
