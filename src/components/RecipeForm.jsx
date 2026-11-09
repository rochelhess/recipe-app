import { useState } from "react";

function toList(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function RecipeForm({ initialRecipe, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initialRecipe?.title ?? "");
  const [description, setDescription] = useState(
    initialRecipe?.description ?? "",
  );
  const [image, setImage] = useState(initialRecipe?.image ?? "");
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTime ?? "");
  const [cookTime, setCookTime] = useState(initialRecipe?.cookTime ?? "");
  const [servings, setServings] = useState(initialRecipe?.servings ?? "");
  const [ingredients, setIngredients] = useState(
    initialRecipe ? initialRecipe.ingredients.join("\n") : "",
  );
  const [instructions, setInstructions] = useState(
    initialRecipe ? initialRecipe.instructions.join("\n") : "",
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await onSubmit({
        title,
        description,
        image,
        prepTime,
        cookTime,
        servings: Number(servings),
        ingredients: toList(ingredients),
        instructions: toList(instructions),
      });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
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

      {error && <p className="no-results">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default RecipeForm;
