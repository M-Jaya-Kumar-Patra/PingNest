import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import Project from "../models/project.model.js";

let io;

const parseCookies = (cookieHeader = "") =>
  cookieHeader
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .filter(([key, value]) => key && value)
    .reduce((cookies, [key, value]) => {
      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.corsOrigins,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const cookies = parseCookies(socket.handshake.headers.cookie);
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(accessToken, env.jwtAccessSecret);
      socket.userId = decoded.id;

      return next();
    } catch {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join-project", async (projectId) => {
      try {
        const project = await Project.exists({
          _id: projectId,
          owner: socket.userId,
        });

        if (!project) {
          socket.emit("socket:error", "Project not found");
          return;
        }

        socket.join(projectId);
      } catch {
        socket.emit("socket:error", "Project not found");
      }
    });

    socket.on("leave-project", (projectId) => {
      socket.leave(projectId);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};
