import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import statusCode from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { User } from "@prisma/client";

const login = catchAsync(async (req: Request, res: Response) => {
    const email = await req.body.email;
    const password = await req.body.password;

    const result = await AuthService.login(email, password);

    const userToken = await createUserTokens(result as User);

    // Set Cookies
    setAuthCookie(res, userToken);

    sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "Log In Successfully!",
        data: {
            accessToken: userToken.accessToken,
            refreshToken: userToken.refreshToken,
            user: result
        }
    })
});

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(statusCode.BAD_REQUEST, "No Refresh token get from cookies!")
    }
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken);

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Get Token Successfully!",
        data: tokenInfo
    })
});

const logOut = catchAsync(async (req: Request, res: Response) => {

    // destroy cookies
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true // For Google Chrome
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true // For Google Chrome
    });

    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Log Out Successfully!",
        data: null
    })
});

export const AuthControllers = {
    login,
    logOut,
    getNewAccessToken
}