import { Request, Response } from "express"
import httpStatusCode from "http-status-codes";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";


const getMe = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getMe();

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result
    })
})



export const UserControllers = {
    getMe,
}