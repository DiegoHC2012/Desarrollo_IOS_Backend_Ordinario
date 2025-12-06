import { UpdateGradeUseCase } from "../../src/modules/grades/useCase/updateGradeUseCase";
import { mockGradesRepository } from "./mockGradesRepository";

describe("UpdateGradeUseCase", () => {

  it("debe actualizar una calificación", async () => {
    const body = { title: "Parcial 1 Actualizado", value: 90 };

    mockGradesRepository.updateGrade.mockResolvedValue(undefined);

    const useCase = new UpdateGradeUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math", "grade1", body);

    expect(result.status).toBe(200);
    expect(result.data.id).toBe("grade1");
    expect(result.data.value).toBe(90);
  });

});
