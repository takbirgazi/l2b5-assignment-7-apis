/* eslint-disable no-console */
import { prisma } from '../config/db';
import { envVars } from '../config/env';
import bcryptjs from "bcryptjs";
import { Prisma, Role } from '@prisma/client';


export const seedSuperAdmin = async () => {

    try {
        const { email, password, ...rest }: Prisma.UserCreateInput = {
            name: "Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: envVars.SUPER_ADMIN_PASSWORD,
            role: Role.SUPER_ADMIN
        };

        // Check if user already exists
        const isExistUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (isExistUser) {
            console.log("Super Admin has already been created!");
            return;
        }


        // Hash password
        const hashedPassword = await bcryptjs.hash(
            password as string,
            Number(envVars.BCRYPT_SALT_ROUND)
        );


        // Create user
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                ...rest
            }
        })

        console.log("Super Admin created:", user);
        return user;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
}