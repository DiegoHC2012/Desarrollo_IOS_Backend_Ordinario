import { inject, injectable } from "tsyringe";
import WhiteLabelRepository from "../domain/repository/whiteLabelRepository";
import UpdateWhiteLabelBody from "../domain/dto/updateWhiteLabelBody";

@injectable()
export class UpdateWhiteLabelUseCase {
  constructor(
    @inject("WhiteLabelRepository") private repo: WhiteLabelRepository
  ) {}

  async execute(institutionId: string, body: UpdateWhiteLabelBody) {
    await this.repo.updateWhiteLabel(institutionId, body);
    return { status: 200, data: { id: institutionId, ...body } };
  }
}
