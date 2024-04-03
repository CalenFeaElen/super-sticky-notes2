"use client";

import { useState, useEffect } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header";
import NotesList from "./components/noteslist";

export default function Home() {
  const [notes, setNotes] = useState([
    {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    },
  ]);
  const [savedNotes, setSavedNotes] = useLocalStorage("savedNotes");
  const [searchText, setSearchText] = useState("");
  const notesFromStorage = useReadLocalStorage("savedNotes");

  useEffect(() => {
    if (notesFromStorage) {
      const storageNotes = JSON.parse(notesFromStorage);
      setNotes(storageNotes);
    }
  }, []);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    setNotes([newNote, ...notes]);
  };

  const removeNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    const updatedNotesString = JSON.stringify(updatedNotes);
    setSavedNotes(updatedNotesString);
  };

  const onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    setNotes(updatedNotes);
    addToStorage(notes);
  };

  const onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    setNotes(updatedNotes);
    setSearchText(newSearchText);
  };

  const addToStorage = (notes) => {
    let notesToAdd = JSON.stringify(notes);
    setSavedNotes(notesToAdd);
  };

  return (
    <main className="main">
      <Header addNote={addNote} searchText={searchText} onSearch={onSearch} />
      <NotesList notes={notes} onType={onType} removeNote={removeNote} />
    </main>
  );
}
