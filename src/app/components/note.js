"use client";

import React from "react";

const Note = ({ note, onType, removeNote }) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = note.id;
    onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = note.id;
    onType(editMeId, "description", updatedValue);
  };

  const clickDelete = (e) => {
    removeNote(note.id);
  };

  return (
    <div className="note">
      <div className="note-title">
        <input
          className="title"
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={updateTitle}
        />
        <span className="note-delete" onClick={clickDelete}>
          X
        </span>
      </div>
      <textarea
        className="description"
        placeholder="Description..."
        value={note.description}
        onChange={updateDescription}
      />
    </div>
  );
};

export default Note;
