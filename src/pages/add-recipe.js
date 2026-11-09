import Link from "next/link";
import { useRouter } from "next/router";
import RecipeForm from "@/components/RecipeForm";

export default function AddRecipe() {
  const router = useRouter();

  async function handleAdd(recipe) {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not add recipe");
    }

    router.push(`/recipes/${data.id}`);
  }

  return (
    <div className="add-recipe">
      <Link href="/">← Back to Recipes</Link>

      <h1>Add a Recipe</h1>

      <RecipeForm onSubmit={handleAdd} submitLabel="Add Recipe" />
    </div>
  );
}
