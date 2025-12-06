import { UpdateWhiteLabelUseCase } from "../../src/modules/whitelabel/useCase/updateWhiteLabelUseCase";
import { mockWhiteLabelRepository } from "./mockWhiteLabelRepository";

describe("UpdateWhiteLabelUseCase", () => {

  it("debe actualizar la configuración correctamente", async () => {
    const body = {
      name: "Instituto Nahual Actualizado",
      colors: { primary: "#AA0000" }
    };

    mockWhiteLabelRepository.updateWhiteLabel.mockResolvedValue(undefined);

    const useCase = new UpdateWhiteLabelUseCase(
      mockWhiteLabelRepository as any
    );

    const result = await useCase.execute("inst1", body);

    expect(result.status).toBe(200);
    expect(result.data.id).toBe("inst1");
    expect(result.data.name).toBe("Instituto Nahual Actualizado");
    expect(mockWhiteLabelRepository.updateWhiteLabel)
      .toHaveBeenCalledWith("inst1", body);
  });

});
