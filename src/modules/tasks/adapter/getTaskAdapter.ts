import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetTaskUseCase } from "../useCase/getTaskUseCase";

@injectable()
export class GetTaskAdapter {
  constructor(
    @inject(GetTaskUseCase) private useCase: GetTaskUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.params.taskId
    );
  }
}
