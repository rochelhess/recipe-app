import Link from "next/link";

function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        My Recipe App
      </Link>

      <div className="navbar-links">
        <Link href="/add-recipe">Add Recipe</Link>
      </div>
    </nav>
  );
}

export default Navbar;
