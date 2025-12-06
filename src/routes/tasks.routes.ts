import { Router } from "express";
import { container } from "tsyringe";

import { GetTasksAdapter } from "../modules/tasks/adapter/getTasksAdapter";
import { GetTaskAdapter } from "../modules/tasks/adapter/getTaskAdapter";
import { CreateTaskAdapter } from "../modules/tasks/adapter/createTaskAdapter";
import { UpdateTaskAdapter } from "../modules/tasks/adapter/updateTaskAdapter";
import { DeleteTaskAdapter } from "../modules/tasks/adapter/deleteTaskAdapter";

const router = Router();

// LISTAR TAREAS
router.get("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(GetTasksAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// OBTENER UNA
router.get("/:institutionId/:studentId/:taskId", async (req, res) => {
  const adapter = container.resolve(GetTaskAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// CREAR
router.post("/:institutionId/:studentId", async (req, res) => {
  const adapter = container.resolve(CreateTaskAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ACTUALIZAR
router.put("/:institutionId/:studentId/:taskId", async (req, res) => {
  const adapter = container.resolve(UpdateTaskAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

// ELIMINAR
router.delete("/:institutionId/:studentId/:taskId", async (req, res) => {
  const adapter = container.resolve(DeleteTaskAdapter);
  const response = await adapter.execute(req);
  res.status(response.status).json(response);
});

export default router;
