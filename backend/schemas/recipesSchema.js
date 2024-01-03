import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Recipes = model("Recipes", recipeSchema);

export default Recipes;
