"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tsyringe_1 = require("tsyringe");
// --- Firebase init ---
require("./config/firebase");
// --- Rutas ---
const subjects_routes_1 = __importDefault(require("./routes/subjects.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const grades_routes_1 = __importDefault(require("./routes/grades.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const announcements_routes_1 = __importDefault(require("./routes/announcements.routes"));
const whitelabel_routes_1 = __importDefault(require("./routes/whitelabel.routes"));
// --- Repositories ---
const subjectsRepositoryFirebase_1 = require("./modules/subjects/infrastructure/subjectsRepositoryFirebase");
const studentRepositoryFirebase_1 = require("./modules/student/infraestructure/studentRepositoryFirebase");
const tasksRepositoryFirebase_1 = require("./modules/tasks/infraestructure/tasksRepositoryFirebase");
const gradesRepositoryFirebase_1 = require("./modules/grades/infraestructure/gradesRepositoryFirebase");
const announcementsRepositoryFirebase_1 = require("./modules/announcements/infraestructure/announcementsRepositoryFirebase");
const whiteLabelRepositoryFirebase_1 = require("./modules/whitelabel/infraestructure/whiteLabelRepositoryFirebase");
const app = (0, express_1.default)();
// --- Middlewares ---
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ======================================================
//   Registro de dependencias (tsyringe)
// ======================================================
tsyringe_1.container.register("SubjectsRepository", {
    useClass: subjectsRepositoryFirebase_1.SubjectsRepositoryFirebase,
});
tsyringe_1.container.register("TasksRepository", {
    useClass: tasksRepositoryFirebase_1.TasksRepositoryFirebase,
});
tsyringe_1.container.register("GradesRepository", {
    useClass: gradesRepositoryFirebase_1.GradesRepositoryFirebase,
});
tsyringe_1.container.register("StudentRepository", {
    useClass: studentRepositoryFirebase_1.StudentRepositoryFirebase,
});
tsyringe_1.container.register("AnnouncementsRepository", {
    useClass: announcementsRepositoryFirebase_1.AnnouncementsRepositoryFirebase,
});
tsyringe_1.container.register("WhiteLabelRepository", {
    useClass: whiteLabelRepositoryFirebase_1.WhiteLabelRepositoryFirebase,
});
// ======================================================
//   Rutas del sistema
// ======================================================
app.use("/subjects", subjects_routes_1.default);
app.use("/tasks", tasks_routes_1.default);
app.use("/grades", grades_routes_1.default);
app.use("/student", student_routes_1.default);
app.use("/announcements", announcements_routes_1.default);
app.use("/whitelabel", whitelabel_routes_1.default);
// Ruta de prueba
app.get("/", (_, res) => {
    res.json({ message: "API Realtime: By DiegoHC & EduardoPC 🚀 2025" });
});
exports.default = app;
