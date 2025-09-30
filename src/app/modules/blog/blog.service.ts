import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createBlog = async (userId: string, payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const blog = await prisma.blog.create({
        data: {
            ...payload,
            author: { connect: { id: Number(userId) } },
        },
    });
    return blog;
};

const getAllBlogs = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const [total, blogs] = await Promise.all([
        prisma.blog.count(),
        prisma.blog.findMany({
            skip,
            take: limit,
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        picture: true
                    },
                },
            },
        }),
    ]);

    const totalPage = Math.ceil(total / limit);

    return {
        meta: {
            total,
            totalPage,
            currentPage: page,
            limit,
        },
        data: blogs,
    };
};

export const BlogService = {
    createBlog,
    getAllBlogs
}