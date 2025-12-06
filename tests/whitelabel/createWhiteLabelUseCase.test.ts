import { CreateWhiteLabelUseCase } from "../../src/modules/whitelabel/useCase/createWhiteLabelUseCase";
import { mockWhiteLabelRepository } from "./mockWhiteLabelRepository";

describe("CreateWhiteLabelUseCase", () => {

  it("debe crear una configuración correctamente", async () => {
    const body = {
      name: "Colegio Náhuatl",
      logo: "https://logo.png",
      colors: { primary: "#123456", secondary: "#654321" },
      welcomeMessage: "Bienvenido al portal",
      homeText: "Accede a tu información",
      supportUrl: "https://soporte.nahual.com"
    };

    mockWhiteLabelRepository.createWhiteLabel.mockResolvedValue(undefined);

    const useCase = new CreateWhiteLabelUseCase(
      mockWhiteLabelRepository as any
    );

    const result = await useCase.execute("inst1", body);

    expect(result.status).toBe(201);
    expect(result.data).toEqual(body);
    expect(mockWhiteLabelRepository.createWhiteLabel)
      .toHaveBeenCalledWith("inst1", body);
  });

});
