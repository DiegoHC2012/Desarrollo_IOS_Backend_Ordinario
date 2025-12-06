import "reflect-metadata";
import express from "express";
import cors from "cors";
import { container } from "tsyringe";

// --- Firebase init ---
import "./config/firebase";

// --- Rutas ---
import subjectsRouter from "./routes/subjects.routes";
import tasksRouter from "./routes/tasks.routes";
import gradesRouter from "./routes/grades.routes";

// --- Repositories ---
import { SubjectsRepositoryFirebase } from "./modules/subjects/infrastructure/subjectsRepositoryFirebase";
import { TasksRepositoryFirebase } from "./modules/tasks/infraestructure/tasksRepositoryFirebase";
import { GradesRepositoryFirebase } from "./modules/grades/infraestructure/gradesRepositoryFirebase";

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// ======================================================
//   Registro de dependencias (tsyringe)
// ======================================================
container.register("SubjectsRepository", {
  useClass: SubjectsRepositoryFirebase,
});

container.register("TasksRepository", {
  useClass: TasksRepositoryFirebase,
});

container.register("GradesRepository", {
  useClass: GradesRepositoryFirebase,
});

// ======================================================
//   Rutas del sistema
// ======================================================
app.use("/subjects", subjectsRouter);
app.use("/tasks", tasksRouter);
app.use("/grades", gradesRouter);

// Ruta de prueba
app.get("/", (_, res) => {
  res.json({ message: "API Realtime: By DiegoHC & EduardoPC 🚀 2025" });
});

export default app;
