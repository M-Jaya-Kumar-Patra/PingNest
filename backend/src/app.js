import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler.js";
import ApiError from "./utils/ApiError.js";
import { env } from "./config/env.js";

//routes
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import telemetryRoutes from "./routes/telemetry.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new ApiError(403, "Origin not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

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



app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
