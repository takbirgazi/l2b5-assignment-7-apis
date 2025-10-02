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

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10
    const result = await ProjectService.getAllProjects(page, limit);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: 'All Projects retrieved successfully!',
        data: result.data,
        meta: result.meta
    })
});

const getSingleProjects = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const result = await ProjectService.getSingleProjects(slug);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: 'Single Project retrieved successfully!',
        data: result
    })
});

const editSingleProjects = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const slug = req.params.slug;
    const payload = await req.body;

    const result = await ProjectService.editSingleProjects(decodedToken.userId, slug, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: 'Project updated successfully!',
        data: result
    })
});

const deleteSingleProjects = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const decodedToken = req.user as JwtPayload;
    const result = await ProjectService.deleteSingleProjects(id, decodedToken.userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: 'Project deleted successfully!',
        data: result
    })
});

export const ProjectController = {
    createProject,
    getAllProjects,
    getSingleProjects,
    editSingleProjects,
    deleteSingleProjects,
}