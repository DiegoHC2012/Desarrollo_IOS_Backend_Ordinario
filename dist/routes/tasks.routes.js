"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const getTasksAdapter_1 = require("../modules/tasks/adapter/getTasksAdapter");
const getTaskAdapter_1 = require("../modules/tasks/adapter/getTaskAdapter");
const createTaskAdapter_1 = require("../modules/tasks/adapter/createTaskAdapter");
const updateTaskAdapter_1 = require("../modules/tasks/adapter/updateTaskAdapter");
const deleteTaskAdapter_1 = require("../modules/tasks/adapter/deleteTaskAdapter");
const router = (0, express_1.Router)();
// LISTAR TAREAS
router.get("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getTasksAdapter_1.GetTasksAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// OBTENER UNA
router.get("/:institutionId/:studentId/:taskId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getTaskAdapter_1.GetTaskAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// CREAR
router.post("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(createTaskAdapter_1.CreateTaskAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ACTUALIZAR
router.put("/:institutionId/:studentId/:taskId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(updateTaskAdapter_1.UpdateTaskAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ELIMINAR
router.delete("/:institutionId/:studentId/:taskId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(deleteTaskAdapter_1.DeleteTaskAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
exports.default = router;
