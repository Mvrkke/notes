import React, { useState, useEffect } from "react";
import NotesSidebar from "./notes/NotesSidebar";
import NoteEditor from "./notes/NoteEditor";
import { supabase } from "@/lib/supabase";
import type { Note } from "@/lib/utils";

const Home = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
    setupRealtimeSubscription();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;

      setNotes(data || []);
      if (data && data.length > 0 && !selectedNoteId) {
        setSelectedNoteId(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel("notes_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setNotes((prev) => [payload.new as Note, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setNotes((prev) =>
              prev.map((note) =>
                note.id === payload.new.id ? (payload.new as Note) : note,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setNotes((prev) =>
              prev.filter((note) => note.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleNoteSelect = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleNewNote = async () => {
    try {
      const newNote = {
        title: "Untitled Note",
        content: "<p>Start writing your note here...</p>",
      };

      const { data, error } = await supabase
        .from("notes")
        .insert([newNote])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setSelectedNoteId(data.id);
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleNoteChange = async (updatedNote: Note) => {
    try {
      const { error } = await supabase
        .from("notes")
        .update({
          title: updatedNote.title,
          content: updatedNote.content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", updatedNote.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);

      if (error) throw error;

      if (selectedNoteId === id) {
        const nextNote = notes.find((note) => note.id !== id);
        setSelectedNoteId(nextNote?.id || "");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={handleNoteSelect}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
      />
      <div className="flex-1 h-full border-l">
        <NoteEditor note={selectedNote} onNoteChange={handleNoteChange} />
      </div>
    </div>
  );
};

export default Home;
