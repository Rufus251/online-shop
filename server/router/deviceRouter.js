import Router from "express";

import controller from "../controllers/deviceController.js"

const router = new Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

export default router;