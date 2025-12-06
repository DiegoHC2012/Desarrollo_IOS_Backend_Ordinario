import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { UpdateStudentUseCase } from "../useCase/updateStudentUseCase";

@injectable()
export class UpdateStudentAdapter {
  constructor(
    @inject(UpdateStudentUseCase) private useCase: UpdateStudentUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.body
    );
  }
}
