import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { DeleteTaskUseCase } from "../useCase/deleteTaskUseCase";

@injectable()
export class DeleteTaskAdapter {
  constructor(
    @inject(DeleteTaskUseCase) private useCase: DeleteTaskUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(
      req.params.institutionId,
      req.params.studentId,
      req.params.taskId
    );
  }
}
