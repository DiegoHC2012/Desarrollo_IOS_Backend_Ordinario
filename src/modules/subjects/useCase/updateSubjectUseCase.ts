import { inject, injectable } from "tsyringe";
import SubjectsRepository from "../domain/repository/subjectsRepository";
import UpdateSubjectBody from "../domain/dto/updateSubjectBody";

@injectable()
export class UpdateSubjectUseCase {
  constructor(
    @inject("SubjectsRepository")
    private repo: SubjectsRepository
  ) {}

  async execute(institutionId: string, studentId: string, subjectId: string, body: UpdateSubjectBody) {
    await this.repo.updateSubject(institutionId, studentId, subjectId, body);

    return {
      status: 200,
      data: { id: subjectId, ...body },
    };
  }
}
