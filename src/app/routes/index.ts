import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";


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
];

moduleRoute.forEach(route => {
    router.use(route.path, route.route);
})