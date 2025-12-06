import { UpdateSubjectUseCase } from "../../src/modules/subjects/useCase/updateSubjectUseCase";
import { mockSubjectsRepository } from "./mockSubjectsRepository";

describe("UpdateSubjectUseCase", () => {

  it("debe actualizar una materia", async () => {
    const body = { name: "Programación Avanzada" };

    mockSubjectsRepository.updateSubject.mockResolvedValue(undefined);

    const useCase = new UpdateSubjectUseCase(
      mockSubjectsRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "sub1", body);

    expect(result.status).toBe(200);
    expect(result.data.id).toBe("sub1");
    expect(result.data.name).toBe("Programación Avanzada");
  });

});
