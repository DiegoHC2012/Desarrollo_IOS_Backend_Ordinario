import { inject, injectable } from "tsyringe";
import GradesRepository from "../domain/repository/gradesRepository";

@injectable()
export class GetGradesUseCase {
  constructor(
    @inject("GradesRepository") private repo: GradesRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string) {
    const grades = await this.repo.getGrades(institutionId, studentId, subjectId);
    return { status: 200, data: grades };
  }
}
