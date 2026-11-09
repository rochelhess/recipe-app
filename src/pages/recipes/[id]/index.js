import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RecipeDetails() {
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

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.title}"?`,
    );
    if (!confirmed) return;

    const response = await fetch(`/api/recipes/${id}`, { method: "DELETE" });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Could not delete the recipe.");
    }
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
    <div className="recipe-details">
      <Link href="/">← Back to Recipes</Link>

      <h1>{recipe.title}</h1>

      {recipe.image && (
        <img
          className="recipe-details-image"
          src={recipe.image}
          alt={recipe.title}
        />
      )}

      <p className="recipe-description">{recipe.description}</p>

      <div className="recipe-info">
        <div>
          <strong>Prep Time</strong>
          <p>{recipe.prepTime}</p>
        </div>

        <div>
          <strong>Cook Time</strong>
          <p>{recipe.cookTime}</p>
        </div>

        <div>
          <strong>Servings</strong>
          <p>{recipe.servings}</p>
        </div>
      </div>

      <div className="recipe-actions">
        <Link
          href={`/recipes/${recipe.id}/edit`}
          className="edit-recipe-button"
        >
          Edit Recipe
        </Link>

        <button
          type="button"
          className="delete-recipe-button"
          onClick={handleDelete}
        >
          Delete Recipe
        </button>
      </div>

      <section className="recipe-section">
        <h2>Ingredients</h2>

        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-section">
        <h2>Instructions</h2>

        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
