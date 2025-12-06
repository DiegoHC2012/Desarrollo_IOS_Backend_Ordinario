import { GetGradeUseCase } from "../../src/modules/grades/useCase/getGradeUseCase";
import { mockGradesRepository } from "./mockGradesRepository";

describe("GetGradeUseCase", () => {

  it("debe retornar una calificación específica", async () => {
    const grade = { id: "1", title: "Parcial 1", value: 95 };

    mockGradesRepository.getGrade.mockResolvedValue(grade);

    const useCase = new GetGradeUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math", "1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(grade);
  });

  it("debe retornar 404 si no existe", async () => {
    mockGradesRepository.getGrade.mockResolvedValue(null);

    const useCase = new GetGradeUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math", "999");

    expect(result.status).toBe(404);
    expect(result.error).toBe("Calificación no encontrada");
  });

});
