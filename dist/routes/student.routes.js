"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const getStudentAdapter_1 = require("../modules/student/adapter/getStudentAdapter");
const getAllStudentsAdapter_1 = require("../modules/student/adapter/getAllStudentsAdapter");
const createStudentAdapter_1 = require("../modules/student/adapter/createStudentAdapter");
const updateStudentAdapter_1 = require("../modules/student/adapter/updateStudentAdapter");
const deleteStudentAdapter_1 = require("../modules/student/adapter/deleteStudentAdapter");
const router = (0, express_1.Router)();
// OBTENER TODOS LOS ESTUDIANTES
router.get("/all/:institutionId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getAllStudentsAdapter_1.GetAllStudentsAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// OBTENER UNO
router.get("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(getStudentAdapter_1.GetStudentAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// CREAR
router.post("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(createStudentAdapter_1.CreateStudentAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ACTUALIZAR
router.put("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(updateStudentAdapter_1.UpdateStudentAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
// ELIMINAR
router.delete("/:institutionId/:studentId", async (req, res) => {
    const adapter = tsyringe_1.container.resolve(deleteStudentAdapter_1.DeleteStudentAdapter);
    const response = await adapter.execute(req);
    res.status(response.status).json(response);
});
exports.default = router;
