import { GetSubjectsUseCase } from "../../src/modules/subjects/useCase/getSubjectsUseCase";
import { mockSubjectsRepository } from "./mockSubjectsRepository";

describe("GetSubjectsUseCase", () => {

  it("debe retornar la lista de materias", async () => {
    const fakeData = [
      { id: "1", name: "Matemáticas" },
      { id: "2", name: "Historia" }
    ];

    mockSubjectsRepository.getSubjects.mockResolvedValue(fakeData);

    const useCase = new GetSubjectsUseCase(
      mockSubjectsRepository as any
    );

    const result = await useCase.execute("inst1", "student1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(fakeData);
    expect(mockSubjectsRepository.getSubjects).toHaveBeenCalledWith("inst1", "student1");
  });

});
