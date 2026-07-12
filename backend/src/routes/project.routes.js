import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getProjectsController,
  regenerateApiKeyController,
  updateProjectController,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createProjectSchema, updateProjectSchema } from "../validators/project.validator.js";

const router = Router();

router.use(verifyJWT);
router.post("/", validateRequest(createProjectSchema), createProjectController);
router.get("/", getProjectsController);
router.get("/:id", getProjectController);
router.delete("/:id", deleteProjectController);
router.post("/:id/regenerate-api-key", regenerateApiKeyController);
router.patch("/:id", validateRequest(updateProjectSchema), updateProjectController);

export default router;
