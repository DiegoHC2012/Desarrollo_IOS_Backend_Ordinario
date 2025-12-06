import { CreateAnnouncementUseCase } from "../../src/modules/announcements/useCase/createAnnouncementUseCase";
import { mockAnnouncementsRepository } from "./mockAnnouncementsRepository";

describe("CreateAnnouncementUseCase", () => {

  it("debe crear un anuncio correctamente", async () => {
    const body = {
      title: "Nuevo Aviso",
      message: "No hay clases mañana",
      date: "2025-01-15"
    };

    mockAnnouncementsRepository.createAnnouncement.mockResolvedValue("abc123");

    const useCase = new CreateAnnouncementUseCase(
      mockAnnouncementsRepository as any
    );

    const result = await useCase.execute("inst1", body);

    expect(result.status).toBe(201);
    expect(result.data.id).toBe("abc123");
    expect(result.data.title).toBe("Nuevo Aviso");
    expect(mockAnnouncementsRepository.createAnnouncement)
      .toHaveBeenCalledWith("inst1", body);
  });

});
