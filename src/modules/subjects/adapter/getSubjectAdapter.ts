import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetSubjectUseCase } from "../useCase/getSubjectUseCase";

@injectable()
export class GetSubjectAdapter {
  constructor(
    @inject(GetSubjectUseCase)
    private useCase: GetSubjectUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.params.subjectId
    );
  }
}
