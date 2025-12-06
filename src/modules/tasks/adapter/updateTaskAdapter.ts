import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { UpdateTaskUseCase } from "../useCase/updateTaskUseCase";

@injectable()
export class UpdateTaskAdapter {
  constructor(
    @inject(UpdateTaskUseCase) private useCase: UpdateTaskUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.params.taskId,
      req.body
    );
  }
}
