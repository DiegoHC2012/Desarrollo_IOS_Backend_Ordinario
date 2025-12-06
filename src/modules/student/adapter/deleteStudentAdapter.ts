import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { DeleteStudentUseCase } from "../useCase/deleteStudentUseCase";

@injectable()
export class DeleteStudentAdapter {
  constructor(
    @inject(DeleteStudentUseCase) private useCase: DeleteStudentUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId
    );
  }
}
