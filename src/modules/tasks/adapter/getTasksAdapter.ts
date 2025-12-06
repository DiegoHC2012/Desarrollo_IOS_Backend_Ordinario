import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetTasksUseCase } from "../useCase/getTasksUseCase";

@injectable()
export class GetTasksAdapter {
  constructor(
    @inject(GetTasksUseCase) private useCase: GetTasksUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId, req.params.studentId);
  }
}
