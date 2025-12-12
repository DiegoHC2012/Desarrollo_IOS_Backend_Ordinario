import { inject, injectable } from "tsyringe";
import AuthRepository from "../domain/repository/authRepository";
import RegisterRequest from "../domain/dto/registerRequest";
import RegisterResponse from "../domain/dto/registerResponse";

@injectable()
export class RegisterUseCase {
  constructor(
    @inject("AuthRepository") private repo: AuthRepository
  ) {}

  async execute(data: RegisterRequest): Promise<RegisterResponse> {
    // Basic validation
    if (!data.email || !data.password) {
      return {
        status: 400,
        error: "Email y contraseña son requeridos",
      };
    }

    if (!data.institutionId) {
      return {
        status: 400,
        error: "El ID de institución es requerido",
      };
    }

    if (!data.studentData || !data.studentData.name || !data.studentData.career) {
      return {
        status: 400,
        error: "Los datos del estudiante son requeridos",
      };
    }

    if (data.password.length < 6) {
      return {
        status: 400,
        error: "La contraseña debe tener al menos 6 caracteres",
      };
    }

    return await this.repo.register(data);
  }
}
