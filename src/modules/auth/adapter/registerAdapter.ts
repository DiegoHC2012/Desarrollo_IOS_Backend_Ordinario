import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { RegisterUseCase } from "../useCase/registerUseCase";

@injectable()
export class RegisterAdapter {
  constructor(
    @inject(RegisterUseCase) private useCase: RegisterUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.body);
  }
}
