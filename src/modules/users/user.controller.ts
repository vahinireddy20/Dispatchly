import { Request, Response } from "express";
import * as userService from "./user.service";

export const getMeController = async (req: Request, res: Response) => {
    try {
        const user = await userService.getMe(req.user!.id);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
