import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ProjectController.createProject);
router.get("/all", ProjectController.getAllProjects);
router.get("/:slug", ProjectController.getSingleProjects);
router.patch("/:slug", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ProjectController.editSingleProjects);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ProjectController.deleteSingleProjects);

export const projectRoute = router;