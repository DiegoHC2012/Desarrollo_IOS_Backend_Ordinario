import { inject, injectable } from "tsyringe";
import WhiteLabelRepository from "../domain/repository/whiteLabelRepository";
import CreateWhiteLabelBody from "../domain/dto/createWhiteLabelBody";

@injectable()
export class CreateWhiteLabelUseCase {
  constructor(
    @inject("WhiteLabelRepository") private repo: WhiteLabelRepository
  ) {}

  async execute(institutionId: string, body: CreateWhiteLabelBody) {
    await this.repo.createWhiteLabel(institutionId, body);
    return { status: 201, data: body };
  }
}
