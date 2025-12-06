import "reflect-metadata";
import express from "express";
import cors from "cors";
import { container } from "tsyringe";

// --- Firebase init ---
import "./config/firebase";

// --- Rutas ---
import subjectsRouter from "./routes/subjects.routes";

// --- Repositories ---
import { SubjectsRepositoryFirebase } from "./modules/subjects/infrastructure/subjectsRepositoryFirebase";

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

// ======================================================
//   Rutas del sistema
// ======================================================
app.use("/subjects", subjectsRouter);

// Ruta de prueba
app.get("/", (_, res) => {
  res.json({ message: "API Realtime Escolar funcionando 🔥" });
});

export default app;
