import { Router } from "express";
import * as authController from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/request-otp", authController.requestOtpHandler);
authRoutes.post("/verify-otp", authController.verifyOtpHandler);
authRoutes.post("/set-password", authController.setPasswordHandler);
authRoutes.post("/login", authController.loginHandler);

export default authRoutes;