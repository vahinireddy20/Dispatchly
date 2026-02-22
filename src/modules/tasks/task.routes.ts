import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { requireRole } from "../../common/middlewares/role.middleware";
import * as taskController from "./task.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", requireRole([1]), taskController.createTaskController);
router.get("/", taskController.getTasksController);
router.patch("/:id", taskController.updateTaskController);
router.delete("/:id", requireRole([1]), taskController.deleteTaskController);

export default router;
