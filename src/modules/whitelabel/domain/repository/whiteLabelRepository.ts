import CreateWhiteLabelBody from "../dto/createWhiteLabelBody";
import UpdateWhiteLabelBody from "../dto/updateWhiteLabelBody";

export default interface WhiteLabelRepository {
  getWhiteLabel(institutionId: string): Promise<any>;
  createWhiteLabel(institutionId: string, data: CreateWhiteLabelBody): Promise<void>;
  updateWhiteLabel(institutionId: string, data: UpdateWhiteLabelBody): Promise<void>;
}
