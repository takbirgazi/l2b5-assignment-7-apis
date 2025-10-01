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

const getSingleBlog = async (title: string) => {
    return await prisma.$transaction(async (trx) => {
        // Increment views by 1
        await trx.blog.update({
            where: { title },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        return await trx.blog.findUnique({
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        picture: true
                    }
                }
            },
            where: {
                title: title
            }
        });
    });
}

export const BlogService = {
    createBlog,
    getAllBlogs,
    getSingleBlog
}