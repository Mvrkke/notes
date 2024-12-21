import React, { useState } from "react";
import NotesSidebar from "./notes/NotesSidebar";
import NoteEditor from "./notes/NoteEditor";

interface Note {
  id: string;
  title: string;
  content: string;
}

const Home = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("1");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome Note",
      content: "<p>Welcome to your notes app! Start writing...</p>",
    },
  ]);

  const handleNoteSelect = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "<p>Start writing your note here...</p>",
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const handleNoteChange = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
    );
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-background items-start flex-row">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={handleNoteSelect}
        onNewNote={handleNewNote}
      />
      <div className="flex-1 h-full border-l">
        <NoteEditor note={selectedNote} onNoteChange={handleNoteChange} />
      </div>
    </div>
  );
};

export default Home;
