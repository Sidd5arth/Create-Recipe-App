import Recipes from "../schemas/recipesSchema.js";

export const createRecipes = async (req, res) => {
  try {
    const { user_id, title, description, ingredients, steps, image } = req.body;

    if (
      !user_id ||
      !title ||
      !description ||
      !ingredients ||
      !steps ||
      !image
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRecipe = new Recipes({
      user_id,
      title,
      description,
      ingredients,
      steps,
      image,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRecipes = async (req, res) => {
  try {
    const { id, user_id, title, description, ingredients, steps, image } =
      req.body;

    if (
      !id ||
      !user_id ||
      !title ||
      !description ||
      !ingredients ||
      !steps ||
      !image
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingRecipe = await Recipes.findById(id);

    if (!existingRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    existingRecipe.user_id = user_id;
    existingRecipe.title = title;
    existingRecipe.description = description;
    existingRecipe.ingredients = ingredients;
    existingRecipe.steps = steps;
    existingRecipe.image = image;

    await existingRecipe.save();

    res.status(200).json(existingRecipe);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteRecipes = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    const recipeToDelete = await Recipes.findById(id);

    if (!recipeToDelete) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    await recipeToDelete.deleteOne();

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
