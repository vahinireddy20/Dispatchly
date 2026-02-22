import { prisma } from "../../config/prisma";

export const getMe = async (userId: number) => {
    return prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    });
};

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true
        }
    });
};
