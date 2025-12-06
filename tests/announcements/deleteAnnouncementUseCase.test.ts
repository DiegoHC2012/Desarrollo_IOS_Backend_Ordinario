import { DeleteAnnouncementUseCase } from "../../src/modules/announcements/useCase/deleteAnnouncementUseCase";
import { mockAnnouncementsRepository } from "./mockAnnouncementsRepository";

describe("DeleteAnnouncementUseCase", () => {

  it("debe eliminar un anuncio correctamente", async () => {

    mockAnnouncementsRepository.deleteAnnouncement.mockResolvedValue(undefined);

    const useCase = new DeleteAnnouncementUseCase(
      mockAnnouncementsRepository as any
    );

    const result = await useCase.execute("inst1", "abc123");

    expect(result.status).toBe(200);
    expect(result.message).toBe("Anuncio eliminado correctamente");
    expect(mockAnnouncementsRepository.deleteAnnouncement)
      .toHaveBeenCalledWith("inst1", "abc123");
  });

});
