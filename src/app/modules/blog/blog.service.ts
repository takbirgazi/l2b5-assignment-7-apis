import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createBlog = async (userId: string, payload: Prisma.BlogCreateInput): Promise<Blog> => {
    payload.slug = payload.title.toLowerCase().split(' ').join('-');

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

const getSingleBlog = async (slug: string) => {
    return await prisma.$transaction(async (trx) => {
        // Increment views by 1
        await trx.blog.update({
            where: { slug },
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
                slug: slug
            }
        });
    });
};

const editSingleBlog = async (userId: number, slug: string, payload: Prisma.BlogCreateInput) => {

    const blog = await prisma.blog.findUnique({
        where: { slug: slug }
    });

    if (!blog) {
        throw new Error('Blog not found');
    }

    if (blog.authorId !== userId) {
        throw new Error('You are not authorized to edit this blog');
    }

    const updateBlog = await prisma.blog.update({
        where: { id: blog.id },
        data: payload
    });

    return updateBlog;
};

const deleteSingleBlog = async (userId: number, id: number) => {

    const blog = await prisma.blog.findUnique({
        where: { id: id }
    });

    if (!blog) {
        throw new Error('Blog not found');
    }

    if (blog.authorId !== userId) {
        throw new Error('You are not authorized to edit this blog');
    }

    const deleteBlog = await prisma.blog.delete({
        where: { id: id }
    });

    return deleteBlog;
};

export const BlogService = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    editSingleBlog,
    deleteSingleBlog,
}