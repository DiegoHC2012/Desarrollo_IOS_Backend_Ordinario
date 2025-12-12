import { inject, injectable } from "tsyringe";
import AuthRepository from "../domain/repository/authRepository";
import LoginRequest from "../domain/dto/loginRequest";
import LoginResponse from "../domain/dto/loginResponse";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("AuthRepository") private repo: AuthRepository
  ) {}

  async execute(data: LoginRequest): Promise<LoginResponse> {
    // Basic validation
    if (!data.email || !data.password) {
      return {
        status: 400,
        error: "Email y contraseña son requeridos",
      };
    }

    return await this.repo.login(data);
  }
}
