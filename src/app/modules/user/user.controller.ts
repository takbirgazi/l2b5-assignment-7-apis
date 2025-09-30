import { Request, Response } from "express"
import httpStatusCode from "http-status-codes";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = await req.body;
    const result = await UserService.createUser(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.CREATED,
        message: 'User created successfully!',
        data: result
    })
})


const getMe = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserService.getMe(decodedToken);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: "Your profile Retrieved Successfully",
        data: result
    })
})



export const UserControllers = {
    createUser,
    getMe,
}