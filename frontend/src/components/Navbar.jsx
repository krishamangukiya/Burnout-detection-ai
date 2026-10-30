import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Burnout<span>AI</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/check-burnout"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Check Burnout
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Assessment History
          </NavLink>

          <NavLink
            to="/howitworks"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            How It Works
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </div>

        {/* CTA Button */}
        <Link to="/check-burnout" className="navbar-button">
          Start Assessment
          <span>→</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
