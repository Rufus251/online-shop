import Router from "express";
import checkRole from "../middleware/checkRoleMiddleware.js";
import controller from "../controllers/deviceController.js"

const router = new Router();

router.post("/", checkRole('ADMIN'), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

export default router;
