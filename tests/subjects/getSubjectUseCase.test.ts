import { GetSubjectUseCase } from "../../src/modules/subjects/useCase/getSubjectUseCase";
import { mockSubjectsRepository } from "./mockSubjectsRepository";

describe("GetSubjectUseCase", () => {

  it("debe retornar los datos de una materia", async () => {
    const subject = { id: "1", name: "Programación" };

    mockSubjectsRepository.getSubject.mockResolvedValue(subject);

    const useCase = new GetSubjectUseCase(
      mockSubjectsRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(subject);
  });

  it("debe retornar 404 si no existe", async () => {
    mockSubjectsRepository.getSubject.mockResolvedValue(null);

    const useCase = new GetSubjectUseCase(
      mockSubjectsRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "999");

    expect(result.status).toBe(404);
    expect(result.error).toBe("Materia no encontrada");
  });

});
