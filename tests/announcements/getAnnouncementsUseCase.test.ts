import { GetAnnouncementsUseCase } from "../../src/modules/announcements/useCase/getAnnouncementsUseCase";
import { mockAnnouncementsRepository } from "./mockAnnouncementsRepository";

describe("GetAnnouncementsUseCase", () => {

  it("debe retornar todos los anuncios de la institución", async () => {

    const fakeAnnouncements = [
      { id: "1", title: "Aviso 1", message: "Mensaje 1" },
      { id: "2", title: "Aviso 2", message: "Mensaje 2" }
    ];

    mockAnnouncementsRepository.getAnnouncements.mockResolvedValue(fakeAnnouncements);

    const useCase = new GetAnnouncementsUseCase(
      mockAnnouncementsRepository as any
    );

    const result = await useCase.execute("inst1");

    expect(result.status).toBe(200);
    expect(result.data).toEqual(fakeAnnouncements);
    expect(mockAnnouncementsRepository.getAnnouncements).toHaveBeenCalledWith("inst1");
  });

});
