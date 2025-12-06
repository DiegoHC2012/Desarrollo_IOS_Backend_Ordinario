import { inject, injectable } from "tsyringe";
import SubjectsRepository from "../domain/repository/subjectsRepository";

@injectable()
export class DeleteSubjectUseCase {
  constructor(
    @inject("SubjectsRepository")
    private repo: SubjectsRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string) {
    await this.repo.deleteSubject(institutionId, studentId, subjectId);

    return {
      status: 200,
      message: "Materia eliminada correctamente",
    };
  }
}
