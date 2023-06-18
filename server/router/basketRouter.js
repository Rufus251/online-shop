import Router from "express";
import controller from "../controllers/basketController.js"

const router = new Router();

router.post("/create", controller.create);
router.get("/:basketId", controller.getAll);
router.delete("/:basketId/:deviceId", controller.deleteDevice)
export default router;
