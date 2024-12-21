import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditorToolbar from "./EditorToolbar";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteEditorProps {
  note?: Note;
  onNoteChange?: (note: Note) => void;
}

const NoteEditor = ({
  note = {
    id: "1",
    title: "Untitled Note",
    content: "Start writing your note here...",
  },
  onNoteChange = () => {},
}: NoteEditorProps) => {
  return (
    <div className="h-full flex flex-col p-4">
      <input
        type="text"
        value={note.title}
        onChange={(e) => onNoteChange({ ...note, title: e.target.value })}
        className="text-2xl font-semibold mb-4 bg-transparent border-none outline-none"
        placeholder="Untitled Note"
      />

      <EditorToolbar />

      <ScrollArea className="flex-1 mt-4">
        <div
          contentEditable
          className="prose max-w-none focus:outline-none"
          dangerouslySetInnerHTML={{ __html: note.content }}
          onBlur={(e) =>
            onNoteChange({ ...note, content: e.currentTarget.innerHTML })
          }
        />
      </ScrollArea>
    </div>
  );
};

export default NoteEditor;
