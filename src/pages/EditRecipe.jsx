import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditRecipe({ recipes, onUpdateRecipe }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((recipe) => recipe.id === Number(id));

  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : "",
  );
  const [image, setImage] = useState(recipe ? recipe.image : "");
  const [prepTime, setPrepTime] = useState(recipe ? recipe.prepTime : "");
  const [cookTime, setCookTime] = useState(recipe ? recipe.cookTime : "");
  const [servings, setServings] = useState(recipe ? recipe.servings : "");
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients.join("\n") : "",
  );
  const [instructions, setInstructions] = useState(
    recipe ? recipe.instructions.join("\n") : "",
  );

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h1>Recipe not found</h1>
        <Link to="/">← Back to Recipes</Link>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const updatedRecipe = {
      id: recipe.id,
      title: title,
      description: description,
      image: image,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: Number(servings),
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
    };

    onUpdateRecipe(updatedRecipe);

    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <div className="add-recipe">
      <Link to={`/recipes/${recipe.id}`}>← Back to Recipes</Link>

      <h1>Edit Recipe</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label>
          Image URL
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>

        <label>
          Prep Time
          <input
            type="text"
            value={prepTime}
            onChange={(event) => setPrepTime(event.target.value)}
            required
          />
        </label>

        <label>
          Cook Time
          <input
            type="text"
            value={cookTime}
            onChange={(event) => setCookTime(event.target.value)}
            required
          />
        </label>

        <label>
          Servings
          <input
            type="number"
            value={servings}
            onChange={(event) => setServings(event.target.value)}
            required
          />
        </label>

        <label>
          Ingredients
          <span className="form-help">Enter one ingredient per line.</span>
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            required
          />
        </label>

        <label>
          Instructions
          <span className="form-help">Enter one instruction per line.</span>
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            required
          />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditRecipe;
