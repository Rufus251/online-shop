import Router from "express";

import controller from "../controllers/typeController.js"

const router = new Router();

router.post("/", controller.create);
router.get("/", controller.getAll);

export default router;
