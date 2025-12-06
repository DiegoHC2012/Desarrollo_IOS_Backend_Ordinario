import { inject, injectable } from "tsyringe";
import TasksRepository from "../domain/repository/tasksRepository";
import CreateTaskBody from "../domain/dto/createTaskBody";

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository") private repo: TasksRepository
  ) {}

  async execute(institutionId: string, studentId: string, body: CreateTaskBody) {
    const id = await this.repo.createTask(institutionId, studentId, body);
    return { status: 201, data: { id, ...body } };
  }
}
