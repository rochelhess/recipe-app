import connectDB from "@/lib/mongodb";
import Recipe from "@/models/Recipe";
import recipes from "@/data/recipes";

export default async function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    await connectDB();

    const count = await Recipe.countDocuments();
    if (count > 0) {
      return res.status(200).json({ message: `Already has ${count} recipes` });
    }

    const docs = recipes.map(({ id, ...recipe }) => recipe);
    await Recipe.insertMany(docs);

    res.status(201).json({ message: `Seeded ${docs.length} recipes` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
