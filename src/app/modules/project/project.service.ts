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

export const ProjectService = {
    createProject,
}