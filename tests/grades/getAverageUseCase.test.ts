import { GetAverageUseCase } from "../../src/modules/grades/useCase/getAverageUseCase";
import { mockGradesRepository } from "./mockGradesRepository";

describe("GetAverageUseCase", () => {

  it("debe calcular el promedio correctamente", async () => {
    const grades = [
      { id: "1", value: 80 },
      { id: "2", value: 90 },
      { id: "3", value: 70 }
    ];

    mockGradesRepository.getGrades.mockResolvedValue(grades);

    const useCase = new GetAverageUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math");

    expect(result.status).toBe(200);
    expect(result.average).toBe(80); // (80 + 90 + 70) / 3
  });

  it("debe retornar promedio 0 si no hay calificaciones", async () => {
    mockGradesRepository.getGrades.mockResolvedValue([]);

    const useCase = new GetAverageUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math");

    expect(result.status).toBe(200);
    expect(result.average).toBe(0);
  });

});
