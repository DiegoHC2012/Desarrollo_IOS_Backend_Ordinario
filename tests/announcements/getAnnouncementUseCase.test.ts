import { GetAnnouncementUseCase } from "../../src/modules/announcements/useCase/getAnnouncementUseCase";
import { mockAnnouncementsRepository } from "./mockAnnouncementsRepository";

describe("GetAnnouncementUseCase", () => {

  it("debe retornar un anuncio existente", async () => {
    const announcement = {
      id: "1",
      title: "Evento escolar",
      message: "Habrá conferencia",
      date: "2025-02-01"
    };

    mockAnnouncementsRepository.getAnnouncement.mockResolvedValue(announcement);

    const useCase = new GetAnnouncementUseCase(
      mockAnnouncementsRepository as any
    );

    const result = await useCase.execute("inst1", "1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(announcement);
  });

  it("debe retornar 404 si no existe el anuncio", async () => {
    mockAnnouncementsRepository.getAnnouncement.mockResolvedValue(null);

    const useCase = new GetAnnouncementUseCase(
      mockAnnouncementsRepository as any
    );

    const result = await useCase.execute("inst1", "999");

    expect(result.status).toBe(404);
    expect(result.error).toBe("Anuncio no encontrado");
  });

});
