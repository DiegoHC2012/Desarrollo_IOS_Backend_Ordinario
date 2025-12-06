import { injectable } from "tsyringe";
import { db } from "../../../config/firebase";
import TasksRepository from "../domain/repository/tasksRepository";
import CreateTaskBody from "../domain/dto/createTaskBody";
import UpdateTaskBody from "../domain/dto/updateTaskBody";

@injectable()
export class TasksRepositoryFirebase implements TasksRepository {
  
  async getTasks(institutionId: string, studentId: string): Promise<any[]> {
    const ref = db.ref(`institutions/${institutionId}/tasks/${studentId}`);
    const snapshot = await ref.get();

    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...(data as any)
    }));
  }

  async getTask(institutionId: string, studentId: string, taskId: string): Promise<any> {
    const ref = db.ref(`institutions/${institutionId}/tasks/${studentId}/${taskId}`);
    const snapshot = await ref.get();

    return snapshot.exists() ? { id: taskId, ...snapshot.val() } : null;
  }

  async createTask(institutionId: string, studentId: string, data: CreateTaskBody): Promise<string> {
    const ref = db.ref(`institutions/${institutionId}/tasks/${studentId}`).push();
    await ref.set(data);
    return ref.key!;
  }

  async updateTask(institutionId: string, studentId: string, taskId: string, data: UpdateTaskBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/tasks/${studentId}/${taskId}`);
    await ref.update(data);
  }

  async deleteTask(institutionId: string, studentId: string, taskId: string): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/tasks/${studentId}/${taskId}`);
    await ref.remove();
  }
}
