import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    servings: { type: Number, required: true, min: 1 },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
