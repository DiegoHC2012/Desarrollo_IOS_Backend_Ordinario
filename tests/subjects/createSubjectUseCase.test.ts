import { CreateSubjectUseCase } from "../../src/modules/subjects/useCase/createSubjectUseCase";
import { mockSubjectsRepository } from "./mockSubjectsRepository";

describe("CreateSubjectUseCase", () => {

  it("debe crear una materia y retornar su ID", async () => {
    const body = {
      name: "Inglés",
      teacher: "John Doe",
      schedule: "Lun 10-12",
      description: "Curso básico"
    };

    mockSubjectsRepository.createSubject.mockResolvedValue("abc123");

    const useCase = new CreateSubjectUseCase(
      mockSubjectsRepository as any
    );

    const result = await useCase.execute("inst1", "student1", body);

    expect(result.status).toBe(201);
    expect(result.data.id).toBe("abc123");
    expect(result.data.name).toBe("Inglés");
    expect(mockSubjectsRepository.createSubject).toHaveBeenCalled();
  });

});
