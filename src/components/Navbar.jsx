import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        My Recipe App
      </Link>

      <div className="navbar-links">
        {!loading &&
          (user ? (
            <>
              <span className="navbar-user">Hello, {user.name}</span>
              <Link href="/add-recipe">Add Recipe</Link>
              <button type="button" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/register">Register</Link>
            </>
          ))}
      </div>
    </nav>
  );
}

export default Navbar;
