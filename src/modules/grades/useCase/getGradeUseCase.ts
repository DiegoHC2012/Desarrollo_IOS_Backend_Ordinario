import { inject, injectable } from "tsyringe";
import GradesRepository from "../domain/repository/gradesRepository";

@injectable()
export class GetGradeUseCase {
  constructor(
    @inject("GradesRepository") private repo: GradesRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string, gradeId: string) {
    const grade = await this.repo.getGrade(institutionId, studentId, subjectId, gradeId);

    if (!grade)
      return { status: 404, error: "Calificación no encontrada" };

    return { status: 200, data: grade };
  }
}
