import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";


export const router = Router();

const moduleRoute = [
    {
        path: "/user",
        route: userRoutes
    },
];

moduleRoute.forEach(route => {
    router.use(route.path, route.route);
})