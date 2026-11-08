import { useState } from "react";
import recipes from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

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

      {filteredRecipes.length === 0 ? (
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
