import { Router } from "express";
import * as recipesControllers from "../controllers/recipesControllers.js";

const router = Router();

router.get("/all", recipesControllers.getAllRecipes);

router.post("/create", recipesControllers.createRecipes);
router.post("/update", recipesControllers.updateRecipes);
router.post("/delete/:id", recipesControllers.deleteRecipes);

export default router;
