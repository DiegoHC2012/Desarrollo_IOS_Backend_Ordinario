import { DeleteGradeUseCase } from "../../src/modules/grades/useCase/deleteGradeUseCase";
import { mockGradesRepository } from "./mockGradesRepository";

describe("DeleteGradeUseCase", () => {

  it("debe eliminar una calificación", async () => {
    mockGradesRepository.deleteGrade.mockResolvedValue(undefined);

    const useCase = new DeleteGradeUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math", "grade1");

    expect(result.status).toBe(200);
    expect(result.message).toBe("Calificación eliminada correctamente");
    expect(mockGradesRepository.deleteGrade).toHaveBeenCalledWith("inst1", "student1", "math", "grade1");
  });

});
