import { Router } from "express";
import { container } from "tsyringe";

import { GetAnnouncementsAdapter } from "../modules/announcements/adapter/getAnnouncementsAdapter";
import { GetAnnouncementAdapter } from "../modules/announcements/adapter/getAnnouncementAdapter";
import { CreateAnnouncementAdapter } from "../modules/announcements/adapter/createAnnouncementAdapter";
import { UpdateAnnouncementAdapter } from "../modules/announcements/adapter/updateAnnouncementAdapter";
import { DeleteAnnouncementAdapter } from "../modules/announcements/adapter/deleteAnnouncementAdapter";

const router = Router();

// LISTAR TODOS LOS ANUNCIOS
router.get("/:institutionId", async (req, res) => {
  const adapter = container.resolve(GetAnnouncementsAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// OBTENER UNO
router.get("/:institutionId/:announcementId", async (req, res) => {
  const adapter = container.resolve(GetAnnouncementAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// CREAR
router.post("/:institutionId", async (req, res) => {
  const adapter = container.resolve(CreateAnnouncementAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ACTUALIZAR
router.put("/:institutionId/:announcementId", async (req, res) => {
  const adapter = container.resolve(UpdateAnnouncementAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ELIMINAR
router.delete("/:institutionId/:announcementId", async (req, res) => {
  const adapter = container.resolve(DeleteAnnouncementAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

export default router;
