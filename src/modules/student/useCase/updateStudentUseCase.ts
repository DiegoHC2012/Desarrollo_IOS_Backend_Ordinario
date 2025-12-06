import { inject, injectable } from "tsyringe";
import StudentRepository from "../domain/repository/studentRepository";
import UpdateStudentBody from "../domain/dto/updateStudentBody";

@injectable()
export class UpdateStudentUseCase {
  constructor(
    @inject("StudentRepository") private repo: StudentRepository
  ) {}

  async execute(institutionId: string, studentId: string, body: UpdateStudentBody) {
    await this.repo.updateStudent(institutionId, studentId, body);

    return { status: 200, data: { id: studentId, ...body } };
  }
}
