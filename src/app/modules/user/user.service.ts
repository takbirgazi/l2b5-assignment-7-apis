import { prisma } from "../../config/db";
import { Prisma, User } from "@prisma/client"
import { envVars } from "../../config/env";
import bcryptjs from 'bcryptjs';
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const { password, ...rest } = payload;

    // Hash password
    const hashedPassword = await bcryptjs.hash(
        password as string,
        Number(envVars.BCRYPT_SALT_ROUND)
    );

    // Create user
    const createdUser = await prisma.user.create({
        data:
        {
            password: hashedPassword,
            ...rest
        }
    });

    return createdUser
}


const getMe = async (decodedToken: JwtPayload) => {
    const id = decodedToken.userId;
    const userData = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            picture: true,
        },
    });

    return userData
};


export const UserService = {
    createUser,
    getMe,
}