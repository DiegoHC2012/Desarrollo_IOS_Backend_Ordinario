import { Router } from "express";
import { container } from "tsyringe";

import { GetStudentAdapter } from "../modules/student/adapter/getStudentAdapter";
import { GetAllStudentsAdapter } from "../modules/student/adapter/getAllStudentsAdapter";
import { CreateStudentAdapter } from "../modules/student/adapter/createStudentAdapter";
import { UpdateStudentAdapter } from "../modules/student/adapter/updateStudentAdapter";
import { DeleteStudentAdapter } from "../modules/student/adapter/deleteStudentAdapter";

const router = Router();

// OBTENER TODOS LOS ESTUDIANTES
router.get("/all/:institutionId", async (req, res) => {
  const adapter = container.resolve(GetAllStudentsAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// OBTENER UNO
router.get("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(GetStudentAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// CREAR
router.post("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(CreateStudentAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ACTUALIZAR
router.put("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(UpdateStudentAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ELIMINAR
router.delete("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(DeleteStudentAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

export default router;
