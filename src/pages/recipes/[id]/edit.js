import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import RecipeForm from "@/components/RecipeForm";

export default function EditRecipe() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    async function loadRecipe() {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        setRecipe(response.ok ? await response.json() : null);
      } catch {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [router.isReady, id]);

  async function handleUpdate(updatedRecipe) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecipe),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not update recipe");
    }

    router.push(`/recipes/${id}`);
  }

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h1>Recipe not found</h1>
        <Link href="/">← Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="add-recipe">
      <Link href={`/recipes/${id}`}>← Back to Recipe</Link>

      <h1>Edit Recipe</h1>

      <RecipeForm
        initialRecipe={recipe}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />
    </div>
  );
}
