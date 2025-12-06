import { UpdateTaskUseCase } from "../../src/modules/tasks/useCase/updateTaskUseCase";
import { mockTasksRepository } from "./mockTasksRepository";

describe("UpdateTaskUseCase", () => {

  it("debe actualizar una tarea", async () => {
    const body = { title: "Título actualizado", completed: true };

    mockTasksRepository.updateTask.mockResolvedValue(undefined);

    const useCase = new UpdateTaskUseCase(
      mockTasksRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "task1", body);

    expect(result.status).toBe(200);
    expect(result.data.id).toBe("task1");
    expect(result.data.completed).toBe(true);
  });

});
