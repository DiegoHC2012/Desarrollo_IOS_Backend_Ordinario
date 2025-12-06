import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { CreateSubjectUseCase } from "../useCase/createSubjectUseCase";

@injectable()
export class CreateSubjectAdapter {
  constructor(
    @inject(CreateSubjectUseCase)
    private useCase: CreateSubjectUseCase
  ) {}

  async execute(req: Request) {
    const { institutionId, studentId } = req.params;
    return await this.useCase.execute(institutionId, studentId, req.body);
  }
}
