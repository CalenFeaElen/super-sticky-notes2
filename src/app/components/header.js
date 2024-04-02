"use client";
import React from "react";

const Header = ({ addNote, searchText, onSearch }) => {
  const callSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header>
      <h1>Super Sticky Notes2</h1>
      <div className="app-header__controls">
        <button onClick={addNote}>+ New Note</button>
        <input
          type="text"
          className="search"
          placeholder="Type here to search..."
          value={searchText}
          onChange={callSearch}
        />
      </div>
    </header>
  );
};

export default Header;
