import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Burnout<span>Detect</span>
        </Link>


        {/* Navigation */}
        <div className="navbar-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            How It Works
          </NavLink>

        </div>


        {/* Button */}
        <Link
          to="/check-burnout"
          className="navbar-button"
        >
          Check Burnout
          <span>→</span>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;