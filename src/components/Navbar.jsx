import React, { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function Navbar({ onSearchChange }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  };
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">101 Creativezz</h1>
      <div className="navbar-search">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="#Berlin, Nature Life"
          className="searchTerm"
        />
        <button type="submit" className="searchButton">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </nav>
  );
}
