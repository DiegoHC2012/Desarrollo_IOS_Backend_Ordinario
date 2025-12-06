import { DeleteTaskUseCase } from "../../src/modules/tasks/useCase/deleteTaskUseCase";
import { mockTasksRepository } from "./mockTasksRepository";

describe("DeleteTaskUseCase", () => {

  it("debe eliminar una tarea correctamente", async () => {
    mockTasksRepository.deleteTask.mockResolvedValue(undefined);

    const useCase = new DeleteTaskUseCase(
      mockTasksRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "task1");

    expect(result.status).toBe(200);
    expect(result.message).toBe("Tarea eliminada correctamente");
    expect(mockTasksRepository.deleteTask).toHaveBeenCalledWith("inst1", "student1", "task1");
  });

});
