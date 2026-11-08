import { Link } from "react-router-dom";

function RecipeCard({ id, title, description, image }) {
  return (
    <div className="recipe-card">
      <img className="recipe-image" src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/recipes/${id}`}>View Recipe</Link>
    </div>
  );
}

export default RecipeCard;
