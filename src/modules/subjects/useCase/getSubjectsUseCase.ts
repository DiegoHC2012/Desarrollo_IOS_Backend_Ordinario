import { inject, injectable } from "tsyringe";
import SubjectsRepository from "../domain/repository/subjectsRepository";

@injectable()
export class GetSubjectsUseCase {
  constructor(
    @inject("SubjectsRepository")
    private repo: SubjectsRepository
  ) {}

  async execute(institutionId: string, studentId: string) {
    const subjects = await this.repo.getSubjects(institutionId, studentId);

    return {
      status: 200,
      data: subjects,
    };
  }
}
