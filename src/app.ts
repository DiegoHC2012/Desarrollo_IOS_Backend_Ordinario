import "reflect-metadata";
import express from "express";
import cors from "cors";
import { container } from "tsyringe";

// --- Firebase init ---
import "./config/firebase";

// --- Rutas ---
import subjectsRouter from "./routes/subjects.routes";
import tasksRouter from "./routes/tasks.routes";

// --- Repositories ---
import { SubjectsRepositoryFirebase } from "./modules/subjects/infrastructure/subjectsRepositoryFirebase";
import { TasksRepositoryFirebase } from "./modules/tasks/infraestructure/tasksRepositoryFirebase";

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

// ======================================================
//   Rutas del sistema
// ======================================================
app.use("/subjects", subjectsRouter);
app.use("/tasks", tasksRouter);

// Ruta de prueba
app.get("/", (_, res) => {
  res.json({ message: "API Realtime Escolar funcionando 🔥" });
});

export default app;
