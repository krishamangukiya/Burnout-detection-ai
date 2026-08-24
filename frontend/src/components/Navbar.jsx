function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Burnout<span>Detect</span>
      </div>

      <div className="nav-links">
        <link to="/home">Home</link>
        <link to="#about">About</link>
        <link to="#how-it-works">How It Works</link>
      </div>

      {/* CTA Button */}
      <Link to="/check-burnout" className="nav-button">
        Start Assessment
      </Link>
    </nav>
  );
}

export default Navbar;