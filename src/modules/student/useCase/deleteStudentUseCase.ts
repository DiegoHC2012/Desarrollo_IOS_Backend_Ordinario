import { inject, injectable } from "tsyringe";
import StudentRepository from "../domain/repository/studentRepository";

@injectable()
export class DeleteStudentUseCase {
  constructor(
    @inject("StudentRepository") private repo: StudentRepository
  ) {}

  async execute(institutionId: string, studentId: string) {
    await this.repo.deleteStudent(institutionId, studentId);

    return { status: 200, message: "Estudiante eliminado correctamente" };
  }
}
