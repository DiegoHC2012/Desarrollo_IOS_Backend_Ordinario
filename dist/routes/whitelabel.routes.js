"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const getWhiteLabelAdapter_1 = require("../modules/whitelabel/adapter/getWhiteLabelAdapter");
const createWhiteLabelAdapter_1 = require("../modules/whitelabel/adapter/createWhiteLabelAdapter");
const updateWhiteLabelAdapter_1 = require("../modules/whitelabel/adapter/updateWhiteLabelAdapter");
const router = (0, express_1.Router)();
// OBTENER CONFIGURACIÓN
router.get("/:institutionId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getWhiteLabelAdapter_1.GetWhiteLabelAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// CREAR CONFIGURACIÓN
router.post("/:institutionId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(createWhiteLabelAdapter_1.CreateWhiteLabelAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ACTUALIZAR CONFIGURACIÓN
router.put("/:institutionId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(updateWhiteLabelAdapter_1.UpdateWhiteLabelAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
exports.default = router;
