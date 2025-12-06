import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { UpdateSubjectUseCase } from "../useCase/updateSubjectUseCase";

@injectable()
export class UpdateSubjectAdapter {
  constructor(
    @inject(UpdateSubjectUseCase)
    private useCase: UpdateSubjectUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.params.subjectId,
      req.body
    );
  }
}
