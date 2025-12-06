import { inject, injectable } from "tsyringe";
import SubjectsRepository from "../domain/repository/subjectsRepository";

@injectable()
export class GetSubjectUseCase {
  constructor(
    @inject("SubjectsRepository")
    private repo: SubjectsRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string) {
    const subject = await this.repo.getSubject(institutionId, studentId, subjectId);

    if (!subject)
      return { status: 404, error: "Materia no encontrada" };

    return {
      status: 200,
      data: subject,
    };
  }
}
