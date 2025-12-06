import { GetTasksUseCase } from "../../src/modules/tasks/useCase/getTasksUseCase";
import { mockTasksRepository } from "./mockTasksRepository";

describe("GetTasksUseCase", () => {

  it("debe retornar la lista de tareas", async () => {
    const fakeTasks = [
      { id: "1", title: "Hacer tarea", completed: false },
      { id: "2", title: "Estudiar", completed: true }
    ];

    mockTasksRepository.getTasks.mockResolvedValue(fakeTasks);

    const useCase = new GetTasksUseCase(
      mockTasksRepository as any
    );

    const result = await useCase.execute("inst1", "student1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(fakeTasks);
    expect(mockTasksRepository.getTasks).toHaveBeenCalledWith("inst1", "student1");
  });

});
