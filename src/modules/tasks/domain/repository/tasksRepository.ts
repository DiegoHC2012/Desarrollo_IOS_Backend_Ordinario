import CreateTaskBody from "../dto/createTaskBody";
import UpdateTaskBody from "../dto/updateTaskBody";

export default interface TasksRepository {
  getTasks(institutionId: string, studentId: string): Promise<any[]>;
  getTask(institutionId: string, studentId: string, taskId: string): Promise<any>;

  createTask(institutionId: string, studentId: string, data: CreateTaskBody): Promise<string>;
  updateTask(institutionId: string, studentId: string, taskId: string, data: UpdateTaskBody): Promise<void>;
  deleteTask(institutionId: string, studentId: string, taskId: string): Promise<void>;
}
