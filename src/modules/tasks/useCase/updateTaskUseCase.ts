import { inject, injectable } from "tsyringe";
import TasksRepository from "../domain/repository/tasksRepository";
import UpdateTaskBody from "../domain/dto/updateTaskBody";

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject("TasksRepository") private repo: TasksRepository
  ) {}

  async execute(institutionId: string, studentId: string, taskId: string, body: UpdateTaskBody) {
    await this.repo.updateTask(institutionId, studentId, taskId, body);

    return { status: 200, data: { id: taskId, ...body } };
  }
}
