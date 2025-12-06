import { GetWhiteLabelUseCase } from "../../src/modules/whitelabel/useCase/getWhiteLabelUseCase";
import { mockWhiteLabelRepository } from "./mockWhiteLabelRepository";

describe("GetWhiteLabelUseCase", () => {

  it("debe retornar la configuración de la institución", async () => {
    const config = {
      name: "Instituto Nahual",
      logo: "https://logo.png",
      colors: { primary: "#FF0000", secondary: "#000000" },
      welcomeMessage: "Bienvenido!",
      homeText: "Este es tu portal académico",
      supportUrl: "https://soporte.com"
    };

    mockWhiteLabelRepository.getWhiteLabel.mockResolvedValue(config);

    const useCase = new GetWhiteLabelUseCase(
      mockWhiteLabelRepository as any
    );

    const result = await useCase.execute("inst1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(config);
    expect(mockWhiteLabelRepository.getWhiteLabel).toHaveBeenCalledWith("inst1");
  });

  it("debe retornar 404 si no existe configuración", async () => {
    mockWhiteLabelRepository.getWhiteLabel.mockResolvedValue(null);

    const useCase = new GetWhiteLabelUseCase(
      mockWhiteLabelRepository as any
    );

    const result = await useCase.execute("inst404");

    expect(result.status).toBe(404);
    expect(result.error).toBe("Configuración no encontrada");
  });

});
