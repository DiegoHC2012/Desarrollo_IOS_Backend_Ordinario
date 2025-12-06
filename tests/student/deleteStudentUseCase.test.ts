import { DeleteStudentUseCase } from "../../src/modules/student/useCase/deleteStudentUseCase";
import { mockStudentRepository } from "./mockStudentRepository";

describe("DeleteStudentUseCase", () => {

  it("debe eliminar un estudiante correctamente", async () => {
    mockStudentRepository.deleteStudent.mockResolvedValue(undefined);

    const useCase = new DeleteStudentUseCase(
      mockStudentRepository as any
    );

    const result = await useCase.execute("inst1", "std3");

    expect(result.status).toBe(200);
    expect(result.message).toBe("Estudiante eliminado correctamente");
    expect(mockStudentRepository.deleteStudent)
      .toHaveBeenCalledWith("inst1", "std3");
  });

});
