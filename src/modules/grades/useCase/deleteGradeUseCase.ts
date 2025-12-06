import { inject, injectable } from "tsyringe";
import GradesRepository from "../domain/repository/gradesRepository";

@injectable()
export class DeleteGradeUseCase {
  constructor(
    @inject("GradesRepository") private repo: GradesRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string, gradeId: string) {
    await this.repo.deleteGrade(institutionId, studentId, subjectId, gradeId);
    return { status: 200, message: "Calificación eliminada correctamente" };
  }
}
