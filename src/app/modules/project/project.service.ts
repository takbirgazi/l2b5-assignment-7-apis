import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createProject = async (userId: number, payload: Prisma.ProjectCreateInput) => {
    const slug = payload.name.toLowerCase().split(' ').join('-');
    payload.slug = slug;

    const project = await prisma.project.create({
        data: {
            ...payload,
            author: { connect: { id: userId } }
        },
    });

    return project;
};

const getAllProjects = async (page: number, limit: number) => {

    const [total, projects] = await Promise.all([
        prisma.project.count(),
        prisma.project.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        picture: true
                    }
                }
            }
        })
    ]);

    return {
        data: projects,
        meta: {
            total,
            currentPage: page,
            totalPage: Math.ceil(total / limit),
            limit,
        }
    };
};

const getSingleProjects = async (slug: string) => {
    const project = await prisma.project.findUnique({
        where: {
            slug: slug
        },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    picture: true
                }
            }
        }
    });

    return project
};

const editSingleProjects = async (userId: number, slug: string, payload: Prisma.ProjectUpdateInput) => {
    const project = await prisma.project.findUnique({
        where: { slug: slug }
    });
    if (!project) {
        throw new Error('Project not found');
    }
    if (project.authorId !== userId) {
        throw new Error('You are not authorized to edit this project');
    }

    const updateProject = await prisma.project.update({
        where: { id: project.id },
        data: payload
    })

    return updateProject;
};

const deleteSingleProjects = async (id: number, userId: number) => {
    const project = await prisma.project.findUnique({
        where: { id: id }
    });

    if (!project) {
        throw new Error('Project not found');
    }
    if (project.authorId !== userId) {
        throw new Error('You are not authorized to delete this project');
    }

    const deleteProject = await prisma.project.delete({
        where: { id: id }
    });

    return deleteProject;
}

export const ProjectService = {
    createProject,
    getAllProjects,
    getSingleProjects,
    editSingleProjects,
    deleteSingleProjects,
}