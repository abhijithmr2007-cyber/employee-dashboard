import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  function closeMenu() {
    setIsExpanded(false);
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-semibold" onClick={closeMenu} to="/">
          Employee Dashboard
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse${isExpanded ? " show" : ""}`}
          id="main-navigation"
        >
          <div className="navbar-nav ms-auto">
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active fw-semibold" : ""}`
              }
              end
              onClick={closeMenu}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active fw-semibold" : ""}`
              }
              onClick={closeMenu}
              to="/employee-form"
            >
              Employee Form
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
