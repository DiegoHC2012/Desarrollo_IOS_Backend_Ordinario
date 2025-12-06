import { inject, injectable } from "tsyringe";
import StudentRepository from "../domain/repository/studentRepository";

@injectable()
export class GetStudentUseCase {
  constructor(
    @inject("StudentRepository") private repo: StudentRepository
  ) {}

  async execute(institutionId: string, studentId: string) {
    const student = await this.repo.getStudent(institutionId, studentId);

    if (!student)
      return { status: 404, error: "Estudiante no encontrado" };

    return { status: 200, data: student };
  }
}
