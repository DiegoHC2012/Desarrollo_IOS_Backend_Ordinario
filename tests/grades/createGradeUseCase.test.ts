import { CreateGradeUseCase } from "../../src/modules/grades/useCase/createGradeUseCase";
import { mockGradesRepository } from "./mockGradesRepository";

describe("CreateGradeUseCase", () => {

  it("debe crear una nueva calificación y devolver su ID", async () => {
    const body = {
      title: "Proyecto Final",
      value: 100
    };

    mockGradesRepository.createGrade.mockResolvedValue("abc123");

    const useCase = new CreateGradeUseCase(
      mockGradesRepository as any
    );

    const result = await useCase.execute("inst1", "student1", "math", body);

    expect(result.status).toBe(201);
    expect(result.data.id).toBe("abc123");
    expect(result.data.title).toBe("Proyecto Final");
  });

});
