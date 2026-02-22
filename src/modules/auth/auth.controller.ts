import * as authService from "./auth.service";
import { Request, Response } from "express";

export const requestOtpHandler = async (req: Request, res: Response) => {
  try {
    const result = await authService.requestOtp(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const verifyOtpHandler = async (req: Request, res: Response) => {
  try {
    const result = await authService.verifyOtp(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const setPasswordHandler = async (req: Request, res: Response) => {
  try {
    const result = await authService.setPassword(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
