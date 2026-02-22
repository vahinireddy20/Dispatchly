import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { requireRole } from "../../common/middlewares/role.middleware";
import * as userController from "./user.controller";

const router = Router();

router.use(authMiddleware);

router.get("/me", userController.getMeController);
router.get("/", requireRole([1]), userController.getAllUsersController);

export default router;
