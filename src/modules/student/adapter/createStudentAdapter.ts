import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { CreateStudentUseCase } from "../useCase/createStudentUseCase";

@injectable()
export class CreateStudentAdapter {
  constructor(
    @inject(CreateStudentUseCase) private useCase: CreateStudentUseCase
  ) {}

  async execute(req: Request) {
    const { institutionId, studentId } = req.params;
    return await this.useCase.execute(institutionId, studentId, req.body);
  }
}
