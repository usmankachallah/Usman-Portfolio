import { useState } from "react";
import "../styles/Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Usman</h1>
        </div>
        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <a onClick={() => scrollToSection("home")} className="nav-link">
            Home
          </a>
          <a onClick={() => scrollToSection("about")} className="nav-link">
            About
          </a>
          <a onClick={() => scrollToSection("skills")} className="nav-link">
            Skills
          </a>
          <a onClick={() => scrollToSection("projects")} className="nav-link">
            Projects
          </a>
          <a onClick={() => scrollToSection("contact")} className="nav-link">
            Contact
          </a>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
