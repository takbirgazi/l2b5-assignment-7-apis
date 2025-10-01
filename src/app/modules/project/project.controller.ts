import { catchAsync } from "../../utils/catchAsync";
import httpStatusCode from 'http-status-codes';
import { ProjectService } from "./project.service";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const createProject = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const payload = await req.body;

    const result = await ProjectService.createProject(decodedToken.userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: 'Project Created successfully!',
        data: result
    })
});


export const ProjectController = {
    createProject,
}