import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { blogRoute } from "../modules/blog/blog.route";


export const router = Router();

const moduleRoute = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/blog",
        route: blogRoute
    },
];

moduleRoute.forEach(route => {
    router.use(route.path, route.route);
})