import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ProjectController.createProject);

export const projectRoute = router;