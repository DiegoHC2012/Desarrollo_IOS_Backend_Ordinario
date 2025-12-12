"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const getAnnouncementsAdapter_1 = require("../modules/announcements/adapter/getAnnouncementsAdapter");
const getAnnouncementAdapter_1 = require("../modules/announcements/adapter/getAnnouncementAdapter");
const createAnnouncementAdapter_1 = require("../modules/announcements/adapter/createAnnouncementAdapter");
const updateAnnouncementAdapter_1 = require("../modules/announcements/adapter/updateAnnouncementAdapter");
const deleteAnnouncementAdapter_1 = require("../modules/announcements/adapter/deleteAnnouncementAdapter");
const router = (0, express_1.Router)();
// LISTAR TODOS LOS ANUNCIOS
router.get("/:institutionId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getAnnouncementsAdapter_1.GetAnnouncementsAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// OBTENER UNO
router.get("/:institutionId/:announcementId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getAnnouncementAdapter_1.GetAnnouncementAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// CREAR
router.post("/:institutionId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(createAnnouncementAdapter_1.CreateAnnouncementAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ACTUALIZAR
router.put("/:institutionId/:announcementId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(updateAnnouncementAdapter_1.UpdateAnnouncementAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ELIMINAR
router.delete("/:institutionId/:announcementId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(deleteAnnouncementAdapter_1.DeleteAnnouncementAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
exports.default = router;
