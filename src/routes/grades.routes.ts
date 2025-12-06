import { Router } from "express";
import { container } from "tsyringe";

import { GetGradesAdapter } from "../modules/grades/adapter/getGradesAdapter";
import { GetGradeAdapter } from "../modules/grades/adapter/getGradeAdapter";
import { CreateGradeAdapter } from "../modules/grades/adapter/createGradeAdapter";
import { UpdateGradeAdapter } from "../modules/grades/adapter/updateGradeAdapter";
import { DeleteGradeAdapter } from "../modules/grades/adapter/deleteGradeAdapter";

const router = Router();

// LISTAR CALIFICACIONES
router.get("/:institutionId/:studentId/:subjectId", async (req, res) => {
  const adapter = container.resolve(GetGradesAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// OBTENER UNA
router.get("/:institutionId/:studentId/:subjectId/:gradeId", async (req, res) => {
  const adapter = container.resolve(GetGradeAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// CREAR
router.post("/:institutionId/:studentId/:subjectId", async (req, res) => {
  const adapter = container.resolve(CreateGradeAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ACTUALIZAR
router.put("/:institutionId/:studentId/:subjectId/:gradeId", async (req, res) => {
  const adapter = container.resolve(UpdateGradeAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ELIMINAR
router.delete("/:institutionId/:studentId/:subjectId/:gradeId", async (req, res) => {
  const adapter = container.resolve(DeleteGradeAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

export default router;
