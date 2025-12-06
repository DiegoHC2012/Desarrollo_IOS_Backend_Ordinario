import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { DeleteSubjectUseCase } from "../useCase/deleteSubjectUseCase";

@injectable()
export class DeleteSubjectAdapter {
  constructor(
    @inject(DeleteSubjectUseCase)
    private useCase: DeleteSubjectUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.params.subjectId
    );
  }
}
