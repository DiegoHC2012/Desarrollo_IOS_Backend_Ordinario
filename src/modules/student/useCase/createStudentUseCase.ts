import { inject, injectable } from "tsyringe";
import StudentRepository from "../domain/repository/studentRepository";
import CreateStudentBody from "../domain/dto/createStudentBody";

@injectable()
export class CreateStudentUseCase {
  constructor(
    @inject("StudentRepository") private repo: StudentRepository
  ) {}

  async execute(institutionId: string, studentId: string, body: CreateStudentBody) {
    await this.repo.createStudent(institutionId, studentId, body);

    return { status: 201, data: body };
  }
}
