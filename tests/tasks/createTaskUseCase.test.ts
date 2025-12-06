import { CreateTaskUseCase } from "../../src/modules/tasks/useCase/createTaskUseCase";
import { mockTasksRepository } from "./mockTasksRepository";

describe("CreateTaskUseCase", () => {

  it("debe crear una tarea y retornar su ID", async () => {
    const body = {
      title: "Nueva tarea",
      description: "Descripción",
      dueDate: "2025-12-13",
      completed: false
    };

    mockTasksRepository.createTask.mockResolvedValue("abc123");

    const useCase = new CreateTaskUseCase(
      mockTasksRepository as any
    );

    const result = await useCase.execute("inst1", "student1", body);

    expect(result.status).toBe(201);
    expect(result.data.id).toBe("abc123");
    expect(result.data.title).toBe("Nueva tarea");
    expect(mockTasksRepository.createTask).toHaveBeenCalled();
  });

});
