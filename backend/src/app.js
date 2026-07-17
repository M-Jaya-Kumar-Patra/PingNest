import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler.js";
import ApiError from "./utils/ApiError.js";

//routes
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import telemetryRoutes from "./routes/telemetry.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import uptimeRoutes from "./routes/uptime.routes.js";
import incidentRoutes from "./routes/incident.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    succss: true,
    message: "PingNest API Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/telemetry", telemetryRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/uptime", uptimeRoutes);
app.use("/api/v1/incidents", incidentRoutes);

app.use((req, res, next) => {
  console.log("404 middleware hit:", req.originalUrl);

  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
