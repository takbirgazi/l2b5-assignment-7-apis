import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import statusCode from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { newAccessTokenByRefreshToken } from "../../utils/userTokens";

const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new AppError(statusCode.NOT_FOUND, "User Not Found!");
    }
    if (email !== user?.email) {
        throw new AppError(statusCode.NOT_FOUND, "Email is incorrect!");
    }

    if (user.password) {
        const isPasswordMatch = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            throw new AppError(statusCode.NOT_FOUND, "Password is incorrect!");
        }
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        picture: user.picture,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

// Generate New Access Token by refresh token
const getNewAccessToken = async (refreshToken: string) => {

    const newAccessToken = await newAccessTokenByRefreshToken(refreshToken);

    return {
        accessToken: newAccessToken,
    }
};

export const AuthService = {
    login,
    getNewAccessToken
}