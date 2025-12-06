import { GetTaskUseCase } from "../../src/modules/tasks/useCase/getTaskUseCase";
import { mockTasksRepository } from "./mockTasksRepository";

describe("GetTaskUseCase", () => {

  it("debe retornar una tarea específica", async () => {
    const task = { id: "1", title: "Tarea X", completed: false };

    mockTasksRepository.getTask.mockResolvedValue(task);

    const useCase = new GetTaskUseCase(
      mockTasksRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(task);
  });

  it("debe retornar 404 si no existe", async () => {
    mockTasksRepository.getTask.mockResolvedValue(null);

    const useCase = new GetTaskUseCase(
      mockTasksRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "999");

    expect(result.status).toBe(404);
    expect(result.error).toBe("Tarea no encontrada");
  });

});
