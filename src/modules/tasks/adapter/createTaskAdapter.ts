import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { CreateTaskUseCase } from "../useCase/createTaskUseCase";

@injectable()
export class CreateTaskAdapter {
  constructor(
    @inject(CreateTaskUseCase) private useCase: CreateTaskUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.body
    );
  }
}
