import { CreateStudentUseCase } from "../../src/modules/student/useCase/createStudentUseCase";
import { mockStudentRepository } from "./mockStudentRepository";

describe("CreateStudentUseCase", () => {

  it("debe crear un estudiante correctamente", async () => {
    const body = {
      name: "Marco",
      email: "marco@mail.com",
      career: "Diseño",
      group: "5B"
    };

    mockStudentRepository.createStudent.mockResolvedValue(undefined);

    const useCase = new CreateStudentUseCase(
      mockStudentRepository as any
    );

    const result = await useCase.execute("inst1", "std3", body);

    expect(result.status).toBe(201);
    expect(result.data).toEqual(body);
    expect(mockStudentRepository.createStudent)
      .toHaveBeenCalledWith("inst1", "std3", body);
  });

});
