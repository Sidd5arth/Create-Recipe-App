import { Router } from "express";
import * as registerControllers from "../controllers/registerControllers.js";
const router = Router();

router.post("/register", registerControllers.createUser);
router.post("/login", registerControllers.loginUser);

export default router;
