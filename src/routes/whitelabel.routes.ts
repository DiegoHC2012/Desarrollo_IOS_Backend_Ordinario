import { Router } from "express";
import { container } from "tsyringe";

import { GetWhiteLabelAdapter } from "../modules/whitelabel/adapter/getWhiteLabelAdapter";
import { CreateWhiteLabelAdapter } from "../modules/whitelabel/adapter/createWhiteLabelAdapter";
import { UpdateWhiteLabelAdapter } from "../modules/whitelabel/adapter/updateWhiteLabelAdapter";

const router = Router();

// OBTENER CONFIGURACIÓN
router.get("/:institutionId", async (req, res) => {
  const adapter = container.resolve(GetWhiteLabelAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// CREAR CONFIGURACIÓN
router.post("/:institutionId", async (req, res) => {
  const adapter = container.resolve(CreateWhiteLabelAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ACTUALIZAR CONFIGURACIÓN
router.put("/:institutionId", async (req, res) => {
  const adapter = container.resolve(UpdateWhiteLabelAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

export default router;
