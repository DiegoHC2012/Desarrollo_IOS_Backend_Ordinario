import { inject, injectable } from "tsyringe";
import SubjectsRepository from "../domain/repository/subjectsRepository";
import CreateSubjectBody from "../domain/dto/createSubjectBody";

@injectable()
export class CreateSubjectUseCase {
  constructor(
    @inject("SubjectsRepository")
    private repo: SubjectsRepository
  ) {}

  async execute(institutionId: string, studentId: string, body: CreateSubjectBody) {
    const id = await this.repo.createSubject(institutionId, studentId, body);

    return {
      status: 201,
      data: { id, ...body },
    };
  }
}
