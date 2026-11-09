import connectDB from "@/lib/mongodb";
import Recipe from "@/models/Recipe";

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const recipes = await Recipe.find().sort({ createdAt: -1 });
      return res.status(200).json(recipes);
    }

    if (req.method === "POST") {
      const recipe = await Recipe.create(req.body);
      return res.status(201).json(recipe);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
}
