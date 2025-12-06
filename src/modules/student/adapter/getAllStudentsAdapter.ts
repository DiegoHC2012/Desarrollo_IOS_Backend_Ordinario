import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { GetAllStudentsUseCase } from "../useCase/getAllStudentsUseCase";

@injectable()
export class GetAllStudentsAdapter {
  constructor(
    @inject(GetAllStudentsUseCase) private useCase: GetAllStudentsUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.params.institutionId);
  }
}
