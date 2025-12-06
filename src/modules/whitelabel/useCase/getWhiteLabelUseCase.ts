import { inject, injectable } from "tsyringe";
import WhiteLabelRepository from "../domain/repository/whiteLabelRepository";

@injectable()
export class GetWhiteLabelUseCase {
  constructor(
    @inject("WhiteLabelRepository") private repo: WhiteLabelRepository
  ) {}

  async execute(institutionId: string) {
    const config = await this.repo.getWhiteLabel(institutionId);

    if (!config)
      return { status: 404, error: "Configuración no encontrada" };

    return { status: 200, data: config };
  }
}
