import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        Burnout<span>AI</span>
      </Link>

      {/* Navigation */}
      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/check-burnout">
          Check Burnout
        </Link>

        <Link to="/result">
          Results
        </Link>

      </div>

      {/* CTA Button */}
      <Link to="/check-burnout" className="nav-button">
        Start Assessment
      </Link>

    </nav>
  );
}

export default Navbar;