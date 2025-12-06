import { UpdateAnnouncementUseCase } from "../../src/modules/announcements/useCase/updateAnnouncementUseCase";
import { mockAnnouncementsRepository } from "./mockAnnouncementsRepository";

describe("UpdateAnnouncementUseCase", () => {

  it("debe actualizar un anuncio correctamente", async () => {

    const body = {
      title: "Aviso Actualizado",
      message: "Mensaje actualizado"
    };

    mockAnnouncementsRepository.updateAnnouncement.mockResolvedValue(undefined);

    const useCase = new UpdateAnnouncementUseCase(
      mockAnnouncementsRepository as any
    );

    const result = await useCase.execute("inst1", "abc123", body);

    expect(result.status).toBe(200);
    expect(result.data.id).toBe("abc123");
    expect(result.data.title).toBe("Aviso Actualizado");
  });

});
