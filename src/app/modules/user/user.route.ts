import { Router } from "express";
import { UserControllers } from "./user.controller";



const router = Router();

router.get("/me", UserControllers.getMe)




export const userRoutes = router;