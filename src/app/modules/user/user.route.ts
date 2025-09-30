import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";


const router = Router();

router.post("/registration", UserControllers.createUser);
router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);


export const userRoutes = router;