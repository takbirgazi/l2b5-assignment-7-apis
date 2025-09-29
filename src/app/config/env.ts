import dotenv from "dotenv";

dotenv.config();

interface EnvVariable {
    PORT: string,
    DATABASE_URL: string,
    NODE_ENV: "development" | "production",
    FRONTEND_URL: string,
    BACKEND_URL: string,
    EXPRESS_SESSION_SECRET: string
};

const loadEnv = (): EnvVariable => {
    const requireVar: string[] = ["PORT", "DATABASE_URL", "NODE_ENV", "FRONTEND_URL", "BACKEND_URL", "EXPRESS_SESSION_SECRET"];

    requireVar.forEach(key => {
        if (!process.env[key]) {
            throw Error(`Missing Environment VAriable ${key}`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        BACKEND_URL: process.env.BACKEND_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    }
};

export const envVars = loadEnv();