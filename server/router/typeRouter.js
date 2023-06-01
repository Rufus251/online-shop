import Router from "express";
import checkRole from "../middleware/checkRoleMiddleware.js";
import controller from "../controllers/typeController.js"

const router = new Router();

router.post("/", checkRole('ADMIN'), controller.create);
router.get("/", controller.getAll);

export default router;
