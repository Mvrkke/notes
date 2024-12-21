import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesSidebarProps {
  notes?: Note[];
  onNoteSelect?: (id: string) => void;
  onNewNote?: () => void;
  selectedNoteId?: string;
}

const stripHtmlTags = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const NotesSidebar = ({
  notes = [],
  onNoteSelect = () => {},
  onNewNote = () => {},
  selectedNoteId = "",
}: NotesSidebarProps) => {
  return (
    <div className="w-64 h-full flex flex-col p-4 bg-background">
      <Button onClick={onNewNote} className="w-full mb-4">
        <Plus className="h-4 w-4 mr-2 flex content-end items-stretch flex-nowrap" />
        New Note
      </Button>
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {notes.map((note) => (
            <button
              key={note.id}
              className={`w-full text-left p-3 rounded-lg transition-colors ${selectedNoteId === note.id ? "bg-secondary" : "hover:bg-secondary/50"}`}
              onClick={() => onNoteSelect(note.id)}
            >
              <h3 className="font-medium text-sm mb-1 truncate">
                {note.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {stripHtmlTags(note.content)}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotesSidebar;
