import { DeleteSubjectUseCase } from "../../src/modules/subjects/useCase/deleteSubjectUseCase";
import { mockSubjectsRepository } from "./mockSubjectsRepository";

describe("DeleteSubjectUseCase", () => {

  it("debe eliminar una materia", async () => {
    mockSubjectsRepository.deleteSubject.mockResolvedValue(undefined);

    const useCase = new DeleteSubjectUseCase(
      mockSubjectsRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "sub1");

    expect(result.status).toBe(200);
    expect(result.message).toBe("Materia eliminada correctamente");
  });

});
