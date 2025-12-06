import { inject, injectable } from "tsyringe";
import GradesRepository from "../domain/repository/gradesRepository";

@injectable()
export class GetAverageUseCase {
  constructor(
    @inject("GradesRepository") private repo: GradesRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string) {
    const grades = await this.repo.getGrades(institutionId, studentId, subjectId);

    if (grades.length === 0)
      return { status: 200, average: 0 };

    const total = grades.reduce((sum, g) => sum + g.value, 0);
    const avg = total / grades.length;

    return { status: 200, average: avg };
  }
}
