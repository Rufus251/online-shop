import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userController from '../controllers/userController.js'

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.checkAuth);

export default router;
