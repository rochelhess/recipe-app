import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) throw new Error("Could not load recipes");
        setRecipes(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <h1>My Recipe App</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p className="no-results">{error}</p>
      ) : filteredRecipes.length === 0 ? (
        <p className="no-results">No recipes found.</p>
      ) : (
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
            />
          ))}
        </div>
      )}
    </>
  );
}
