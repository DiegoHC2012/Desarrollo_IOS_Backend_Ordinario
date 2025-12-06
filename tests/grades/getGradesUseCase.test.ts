import { GetGradesUseCase } from "../../src/modules/grades/useCase/getGradesUseCase";
import { mockGradesRepository } from "./mockGradesRepository";

describe("GetGradesUseCase", () => {

  it("debe retornar todas las calificaciones de una materia", async () => {
    const fakeGrades = [
      { id: "1", title: "Parcial 1", value: 85 },
      { id: "2", title: "Parcial 2", value: 90 }
    ];

    mockGradesRepository.getGrades.mockResolvedValue(fakeGrades);

    const useCase = new GetGradesUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(fakeGrades);
    expect(mockGradesRepository.getGrades).toHaveBeenCalledWith("inst1", "student1", "math");
  });

});
