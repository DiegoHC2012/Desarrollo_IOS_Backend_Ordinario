"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const getSubjectsAdapter_1 = require("../modules/subjects/adapter/getSubjectsAdapter");
const getSubjectAdapter_1 = require("../modules/subjects/adapter/getSubjectAdapter");
const createSubjectAdapter_1 = require("../modules/subjects/adapter/createSubjectAdapter");
const updateSubjectAdapter_1 = require("../modules/subjects/adapter/updateSubjectAdapter");
const deleteSubjectAdapter_1 = require("../modules/subjects/adapter/deleteSubjectAdapter");
const router = (0, express_1.Router)();
// LISTAR MATERIAS
router.get("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getSubjectsAdapter_1.GetSubjectsAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// OBTENER UNA
router.get("/:institutionId/:studentId/:subjectId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getSubjectAdapter_1.GetSubjectAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// CREAR
router.post("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(createSubjectAdapter_1.CreateSubjectAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ACTUALIZAR
router.put("/:institutionId/:studentId/:subjectId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(updateSubjectAdapter_1.UpdateSubjectAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ELIMINAR
router.delete("/:institutionId/:studentId/:subjectId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(deleteSubjectAdapter_1.DeleteSubjectAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
exports.default = router;
