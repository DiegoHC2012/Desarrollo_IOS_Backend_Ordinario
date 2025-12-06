import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetStudentUseCase } from "../useCase/getStudentUseCase";

@injectable()
export class GetStudentAdapter {
  constructor(
    @inject(GetStudentUseCase) private useCase: GetStudentUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId, req.params.studentId);
  }
}
