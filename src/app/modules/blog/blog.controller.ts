import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import httpStatusCode from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";

const createBlog = catchAsync(async (req: Request, res: Response) => {
    const payload = await req.body;
    const decodedToken = req.user as JwtPayload;

    const result = await BlogService.createBlog(decodedToken.userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.CREATED,
        message: 'Blog created successfully!',
        data: result
    })

});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await BlogService.getAllBlogs(page, limit);

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.CREATED,
        message: 'All blog retrieve successfully!',
        meta: result.meta,
        data: result.data
    })
});


export const BlogController = {
    createBlog,
    getAllBlogs
}