import { inject, injectable } from "tsyringe";
import TasksRepository from "../domain/repository/tasksRepository";

@injectable()
export class GetTaskUseCase {
  constructor(
    @inject("TasksRepository") private repo: TasksRepository
  ) {}

  async execute(institutionId: string, studentId: string, taskId: string) {
    const task = await this.repo.getTask(institutionId, studentId, taskId);

    if (!task)
      return { status: 404, error: "Tarea no encontrada" };

    return { status: 200, data: task };
  }
}
