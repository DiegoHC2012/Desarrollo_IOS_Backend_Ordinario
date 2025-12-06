import { inject, injectable } from "tsyringe";
import TasksRepository from "../domain/repository/tasksRepository";

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject("TasksRepository") private repo: TasksRepository
  ) {}

  async execute(institutionId: string, studentId: string, taskId: string) {
    await this.repo.deleteTask(institutionId, studentId, taskId);

    return { status: 200, message: "Tarea eliminada correctamente" };
  }
}
