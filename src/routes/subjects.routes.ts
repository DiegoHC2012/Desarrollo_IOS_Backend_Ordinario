import { Router } from "express";
import { container } from "tsyringe";

import { GetSubjectsAdapter } from "../modules/subjects/adapter/getSubjectsAdapter";
import { GetSubjectAdapter } from "../modules/subjects/adapter/getSubjectAdapter";
import { CreateSubjectAdapter } from "../modules/subjects/adapter/createSubjectAdapter";
import { UpdateSubjectAdapter } from "../modules/subjects/adapter/updateSubjectAdapter";
import { DeleteSubjectAdapter } from "../modules/subjects/adapter/deleteSubjectAdapter";

const router = Router();

// LISTAR MATERIAS
router.get("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(GetSubjectsAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// OBTENER UNA
router.get("/:institutionId/:studentId/:subjectId", async (req, res) => {
  const adapter = container.resolve(GetSubjectAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// CREAR
router.post("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(CreateSubjectAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ACTUALIZAR
router.put("/:institutionId/:studentId/:subjectId", async (req, res) => {
  const adapter = container.resolve(UpdateSubjectAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ELIMINAR
router.delete("/:institutionId/:studentId/:subjectId", async (req, res) => {
  const adapter = container.resolve(DeleteSubjectAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

export default router;
