import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import statusCode from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/db";
import { UserStatus } from "@prisma/client";


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError(403, "No Token Received")
        }
        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: verifiedToken.email
            }
        })

        if (!isUserExist) {
            throw new AppError(statusCode.BAD_REQUEST, "User does not exist")
        }

        if (isUserExist.status === UserStatus.BLOCK || isUserExist.status === UserStatus.INACTIVE) {
            throw new AppError(statusCode.BAD_REQUEST, `User is ${isUserExist.status}`)
        }


        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }
        req.user = verifiedToken;
        next();
    } catch (err) {
        next(err);
    }

}