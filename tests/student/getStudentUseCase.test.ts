import { GetStudentUseCase } from "../../src/modules/student/useCase/getStudentUseCase";
import { mockStudentRepository } from "./mockStudentRepository";

describe("GetStudentUseCase", () => {

  it("debe retornar un estudiante existente", async () => {
    const fakeStudent = {
      name: "Carlos",
      email: "carlos@mail.com",
      career: "Sistemas",
      group: "7A"
    };

    mockStudentRepository.getStudent.mockResolvedValue(fakeStudent);

    const useCase = new GetStudentUseCase(
      mockStudentRepository as any
    );

    const result = await useCase.execute("inst1", "std1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(fakeStudent);
    expect(mockStudentRepository.getStudent).toHaveBeenCalledWith("inst1", "std1");
  });

  it("debe retornar 404 si el estudiante no existe", async () => {
    mockStudentRepository.getStudent.mockResolvedValue(null);

    const useCase = new GetStudentUseCase(
      mockStudentRepository as any
    );

    const result = await useCase.execute("inst1", "std404");

    expect(result.status).toBe(404);
    expect(result.error).toBe("Estudiante no encontrado");
  });

});
