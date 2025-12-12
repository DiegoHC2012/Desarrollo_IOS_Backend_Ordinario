import { Router } from "express";
import { container } from "tsyringe";

import { RegisterAdapter } from "../modules/auth/adapter/registerAdapter";
import { LoginAdapter } from "../modules/auth/adapter/loginAdapter";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
  const adapter = container.resolve(RegisterAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// LOGIN
router.post("/login", async (req, res) => {
  const adapter = container.resolve(LoginAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

export default router;
