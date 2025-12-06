import { inject, injectable } from "tsyringe";
import TasksRepository from "../domain/repository/tasksRepository";

@injectable()
export class GetTasksUseCase {
  constructor(
    @inject("TasksRepository") private repo: TasksRepository
  ) {}

  async execute(institutionId: string, studentId: string) {
    const tasks = await this.repo.getTasks(institutionId, studentId);
    return { status: 200, data: tasks };
  }
}
