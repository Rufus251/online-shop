import Router from "express";

import controller from "../controllers/brandController.js"

const router = new Router();

router.post("/", checkRole('ADMIN'), controller.create);
router.get("/", controller.getAll);

export default router;
