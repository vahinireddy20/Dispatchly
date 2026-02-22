import { prisma } from '../../config/prisma';

export const createTask = async (params: {
    title: string;
    description: string;
    dueDate: Date;
    assignedUserId?: number;
    adminId: number;
}) => {
    return prisma.task.create({
        data: {
            title: params.title,
            description: params.description,
            dueDate: params.dueDate,
            status: 0,
            assignedUserId: params.assignedUserId,
            createdByAdminId: params.adminId
        }
    })
};

export const getTasks = async (userId: number, role: number) => {
    if (role === 1) { // ADMIN
        return prisma.task.findMany({
            include: { assignedUser: { select: { name: true, email: true } } }
        });
    }
    return prisma.task.findMany({
        where: { assignedUserId: userId }
    });
};

export const updateTask = async (id: number, data: any) => {
    return prisma.task.update({
        where: { id },
        data
    });
};

export const deleteTask = async (id: number) => {
    return prisma.task.delete({
        where: { id }
    });
};
