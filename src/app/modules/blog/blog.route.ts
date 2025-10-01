import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();


router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), BlogController.createBlog);
router.get("/all", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getSingleBlog);
router.patch("/:slug", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), BlogController.editSingleBlog);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), BlogController.deleteSingleBlog);


export const blogRoute = router;