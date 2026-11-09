import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Recipe from "@/models/Recipe";

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

    if (req.method === "PUT") {
      const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!recipe) return res.status(404).json({ error: "Recipe not found" });
      return res.status(200).json(recipe);
    }

    if (req.method === "DELETE") {
      const recipe = await Recipe.findByIdAndDelete(id);
      if (!recipe) return res.status(404).json({ error: "Recipe not found" });
      return res.status(200).json({ message: "Recipe deleted" });
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
