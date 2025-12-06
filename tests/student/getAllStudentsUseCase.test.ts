import { GetAllStudentsUseCase } from "../../src/modules/student/useCase/getAllStudentsUseCase";
import { mockStudentRepository } from "./mockStudentRepository";

describe("GetAllStudentsUseCase", () => {

  it("debe retornar todos los estudiantes de la institución", async () => {
    const students = [
      { id: "std1", name: "Carlos" },
      { id: "std2", name: "Ana" }
    ];

    mockStudentRepository.getAllStudents.mockResolvedValue(students);

    const useCase = new GetAllStudentsUseCase(
      mockStudentRepository as any
    );

    const result = await useCase.execute("inst1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(students);
    expect(mockStudentRepository.getAllStudents).toHaveBeenCalledWith("inst1");
  });

  it("debe retornar un arreglo vacío si no hay estudiantes", async () => {
    mockStudentRepository.getAllStudents.mockResolvedValue([]);

    const useCase = new GetAllStudentsUseCase(
      mockStudentRepository as any
    );

    const result = await useCase.execute("inst1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual([]);
  });

});
