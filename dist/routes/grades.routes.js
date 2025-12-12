"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const getGradesAdapter_1 = require("../modules/grades/adapter/getGradesAdapter");
const getGradeAdapter_1 = require("../modules/grades/adapter/getGradeAdapter");
const createGradeAdapter_1 = require("../modules/grades/adapter/createGradeAdapter");
const updateGradeAdapter_1 = require("../modules/grades/adapter/updateGradeAdapter");
const deleteGradeAdapter_1 = require("../modules/grades/adapter/deleteGradeAdapter");
const router = (0, express_1.Router)();
// LISTAR CALIFICACIONES
router.get("/:institutionId/:studentId/:subjectId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getGradesAdapter_1.GetGradesAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// OBTENER UNA
router.get("/:institutionId/:studentId/:subjectId/:gradeId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getGradeAdapter_1.GetGradeAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// CREAR
router.post("/:institutionId/:studentId/:subjectId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(createGradeAdapter_1.CreateGradeAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ACTUALIZAR
router.put("/:institutionId/:studentId/:subjectId/:gradeId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(updateGradeAdapter_1.UpdateGradeAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ELIMINAR
router.delete("/:institutionId/:studentId/:subjectId/:gradeId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(deleteGradeAdapter_1.DeleteGradeAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
exports.default = router;
