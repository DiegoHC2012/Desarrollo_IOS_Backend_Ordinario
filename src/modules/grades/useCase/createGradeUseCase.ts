import { inject, injectable } from "tsyringe";
import GradesRepository from "../domain/repository/gradesRepository";
import CreateGradeBody from "../domain/dto/createGradeBody";

@injectable()
export class CreateGradeUseCase {
  constructor(
    @inject("GradesRepository") private repo: GradesRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string, body: CreateGradeBody) {
    const id = await this.repo.createGrade(institutionId, studentId, subjectId, body);
    return { status: 201, data: { id, ...body } };
  }
}
