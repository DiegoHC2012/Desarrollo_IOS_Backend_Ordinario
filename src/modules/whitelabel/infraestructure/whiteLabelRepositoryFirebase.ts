import { injectable } from "tsyringe";
import { db } from "../../../config/firebase";
import WhiteLabelRepository from "../domain/repository/whiteLabelRepository";
import CreateWhiteLabelBody from "../domain/dto/createWhiteLabelBody";
import UpdateWhiteLabelBody from "../domain/dto/updateWhiteLabelBody";

@injectable()
export class WhiteLabelRepositoryFirebase implements WhiteLabelRepository {

  async getWhiteLabel(institutionId: string): Promise<any> {
    const ref = db.ref(`institutions/${institutionId}/config`);
    const snapshot = await ref.get();
    return snapshot.exists() ? snapshot.val() : null;
  }

  async createWhiteLabel(institutionId: string, data: CreateWhiteLabelBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/config`);
    await ref.set(data);
  }

  async updateWhiteLabel(institutionId: string, data: UpdateWhiteLabelBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/config`);
    await ref.update(data);
  }
}
