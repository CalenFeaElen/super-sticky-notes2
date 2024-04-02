"use client";
import React from "react";
import Note from "./note";

const NotesList = ({ notes, onType, removeNote }) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatches = notes.filter(keepSearchMatches);
  const renderNote = (note) => (
    <Note note={note} key={note.id} onType={onType} removeNote={removeNote} />
  );
  const noteElements = searchMatches.map(renderNote);

  return <div className="notes">{noteElements}</div>;
};

export default NotesList;
