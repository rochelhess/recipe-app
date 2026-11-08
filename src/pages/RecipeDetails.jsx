import { useParams, Link, useNavigate } from "react-router-dom";

function RecipeDetails({ recipes, onDeleteRecipe }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((recipe) => recipe.id === Number(id));

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h1>Recipe not found</h1>
        <Link to="/">← Back to Recipes</Link>
      </div>
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    onDeleteRecipe(recipe.id);
    navigate("/");
  }

  return (
    <div className="recipe-details">
      <Link to="/">← Back to Recipes</Link>

      <h1>{recipe.title}</h1>

      <img
        className="recipe-details-image"
        src={recipe.image}
        alt={recipe.title}
      />

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
        <Link to={`/recipes/${recipe.id}/edit`} className="edit-recipe-button">
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
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
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

export default RecipeDetails;
