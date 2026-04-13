import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import auditRoutes from "./routes/auditRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import crmRoutes from "./routes/crmRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/crm", crmRoutes);
app.use("/api/audit-logs", auditRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
