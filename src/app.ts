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
import studentRouter from "./routes/student.routes";
import announcementsRouter from "./routes/announcements.routes";
import whiteLabelRouter from "./routes/whitelabel.routes";
import authRouter from "./routes/auth.routes";

// --- Repositories ---
import { SubjectsRepositoryFirebase } from "./modules/subjects/infrastructure/subjectsRepositoryFirebase";
import { StudentRepositoryFirebase } from "./modules/student/infraestructure/studentRepositoryFirebase";
import { TasksRepositoryFirebase } from "./modules/tasks/infraestructure/tasksRepositoryFirebase";
import { GradesRepositoryFirebase } from "./modules/grades/infraestructure/gradesRepositoryFirebase";
import { AnnouncementsRepositoryFirebase } from "./modules/announcements/infraestructure/announcementsRepositoryFirebase";
import { WhiteLabelRepositoryFirebase } from "./modules/whitelabel/infraestructure/whiteLabelRepositoryFirebase";
import { AuthRepositoryFirebase } from "./modules/auth/infrastructure/authRepositoryFirebase";

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

container.register("StudentRepository", {
  useClass: StudentRepositoryFirebase,
});

container.register("AnnouncementsRepository", {
  useClass: AnnouncementsRepositoryFirebase,
});

container.register("WhiteLabelRepository", {
  useClass: WhiteLabelRepositoryFirebase,
});

container.register("AuthRepository", {
  useClass: AuthRepositoryFirebase,
});


// ======================================================
//   Rutas del sistema
// ======================================================
app.use("/auth", authRouter);
app.use("/subjects", subjectsRouter);
app.use("/tasks", tasksRouter);
app.use("/grades", gradesRouter);
app.use("/student", studentRouter);
app.use("/announcements", announcementsRouter);
app.use("/whitelabel", whiteLabelRouter);

// Ruta de prueba
app.get("/", (_, res) => {
  res.json({ message: "API Realtime: By DiegoHC & EduardoPC 🚀 2025" });
});

export default app;
