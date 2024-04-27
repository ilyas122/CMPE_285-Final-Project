import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#08D9D6" }}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Logo" style={{ marginRight: "10px", height: "30px" }} />
            Disease Prediction System
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
