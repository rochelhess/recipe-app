import { useState } from "react";
import { Link } from "react-router-dom";

function AddRecipe({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newRecipe = {
      id: Date.now(),
      title: title,
      description: description,
      image: image,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: Number(servings),
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
    };

    onAddRecipe(newRecipe);

    alert("Recipe added!");
  }

  return (
    <div className="add-recipe">
      <Link to="/">← Back to Recipes</Link>

      <h1>Add a Recipe</h1>

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
            placeholder="Example: 15 minutes"
            value={prepTime}
            onChange={(event) => setPrepTime(event.target.value)}
            required
          />
        </label>

        <label>
          Cook Time
          <input
            type="text"
            placeholder="Example: 45 minutes"
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
            placeholder={"2 cups flour\n1 cup sugar\n3 eggs"}
            required
          />
        </label>

        <label>
          Instructions
          <span className="form-help">Enter one instruction per line.</span>
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            placeholder={
              "Preheat the oven.\nMix the ingredients.\nBake for 30 minutes."
            }
            required
          />
        </label>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
