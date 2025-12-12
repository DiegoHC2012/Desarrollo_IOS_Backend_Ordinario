import { Request } from "express";
import { inject, injectable } from "tsyringe";
import { LoginUseCase } from "../useCase/loginUseCase";

@injectable()
export class LoginAdapter {
  constructor(
    @inject(LoginUseCase) private useCase: LoginUseCase
  ) {}

  async execute(req: Request) {
    return await this.useCase.execute(req.body);
  }
}
