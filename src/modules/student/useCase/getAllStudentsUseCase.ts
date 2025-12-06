import { inject, injectable } from "tsyringe";
import StudentRepository from "../domain/repository/studentRepository";

@injectable()
export class GetAllStudentsUseCase {
  constructor(
    @inject("StudentRepository") private repo: StudentRepository
  ) {}

  async execute(institutionId: string) {
    const students = await this.repo.getAllStudents(institutionId);
    return { status: 200, data: students };
  }
}
