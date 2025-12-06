import { UpdateStudentUseCase } from "../../src/modules/student/useCase/updateStudentUseCase";
import { mockStudentRepository } from "./mockStudentRepository";

describe("UpdateStudentUseCase", () => {

  it("debe actualizar un estudiante correctamente", async () => {
    const body = { name: "Marco Antonio", group: "6C" };

    mockStudentRepository.updateStudent.mockResolvedValue(undefined);

    const useCase = new UpdateStudentUseCase(
      mockStudentRepository as any
    );

    const result = await useCase.execute("inst1", "std3", body);

    expect(result.status).toBe(200);
    expect(result.data.id).toBe("std3");
    expect(result.data.group).toBe("6C");
    expect(mockStudentRepository.updateStudent)
      .toHaveBeenCalledWith("inst1", "std3", body);
  });

});
