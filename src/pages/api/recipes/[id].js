import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Recipe from "@/models/Recipe";
import { getUserIdFromRequest } from "@/lib/auth";
import { pickFields } from "@/lib/recipeFields";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  try {
    await connectDB();

    if (req.method === "GET") {
      const recipe = await Recipe.findById(id);
      if (!recipe) return res.status(404).json({ error: "Recipe not found" });
      return res.status(200).json(recipe);
    }

    if (req.method === "PUT" || req.method === "DELETE") {
      const userId = getUserIdFromRequest(req);
      if (!userId) {
        return res.status(401).json({ error: "You must be logged in" });
      }

      const recipe = await Recipe.findById(id);
      if (!recipe) return res.status(404).json({ error: "Recipe not found" });

      if (!recipe.owner || recipe.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You can only change your own recipes" });
      }

      if (req.method === "DELETE") {
        await recipe.deleteOne();
        return res.status(200).json({ message: "Recipe deleted" });
      }

      recipe.set(pickFields(req.body));
      await recipe.save();
      return res.status(200).json(recipe);
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
}
