import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        My Recipe App
      </Link>

      <div className="navbar-links">
        <Link to="/add-recipe">Add Recipe</Link>
      </div>
    </nav>
  );
}

export default Navbar;
