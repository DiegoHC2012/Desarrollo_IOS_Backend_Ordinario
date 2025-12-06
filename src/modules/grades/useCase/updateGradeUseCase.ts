import { inject, injectable } from "tsyringe";
import GradesRepository from "../domain/repository/gradesRepository";
import UpdateGradeBody from "../domain/dto/updateGradeBody";

@injectable()
export class UpdateGradeUseCase {
  constructor(
    @inject("GradesRepository") private repo: GradesRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string, gradeId: string, body: UpdateGradeBody) {
    await this.repo.updateGrade(institutionId, studentId, subjectId, gradeId, body);

    return { status: 200, data: { id: gradeId, ...body } };
  }
}
