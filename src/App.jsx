import recipes from "./data/recipes";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [recipeList, setRecipeList] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState("");

  function addRecipe(newRecipe) {
    setRecipeList((currentRecipes) => [...currentRecipes, newRecipe]);
  }

  function updateRecipe(updatedRecipe) {
    setRecipeList((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    );
  }

  function deleteRecipe(recipeId) {
    setRecipeList((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== recipeId),
    );
  }

  const filteredRecipes = recipeList.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
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
          }
        />

        <Route
          path="/recipes/:id"
          element={
            <RecipeDetails recipes={recipeList} onDeleteRecipe={deleteRecipe} />
          }
        />

        <Route
          path="/recipes/:id/edit"
          element={
            <EditRecipe recipes={recipeList} onUpdateRecipe={updateRecipe} />
          }
        />

        <Route
          path="/add-recipe"
          element={<AddRecipe onAddRecipe={addRecipe} />}
        />
      </Routes>
    </div>
  );
}

export default App;
