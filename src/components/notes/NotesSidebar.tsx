import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash } from "lucide-react";
import type { Note } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface NotesSidebarProps {
  notes?: Note[];
  onNoteSelect?: (id: string) => void;
  onNewNote?: () => void;
  onDeleteNote?: (id: string) => void;
  selectedNoteId?: string;
}

const stripHtmlTags = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const NotesSidebar = ({
  notes = [],
  onNoteSelect = () => {},
  onNewNote = () => {},
  onDeleteNote = () => {},
  selectedNoteId = "",
}: NotesSidebarProps) => {
  return (
    <div className="w-64 h-full flex flex-col p-4 bg-background">
      <Button onClick={onNewNote} className="w-full mb-4">
        <Plus className="h-4 w-4 mr-2" />
        New Note
      </Button>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {notes.map((note) => (
            <ContextMenu key={note.id}>
              <ContextMenuTrigger>
                <button
                  className={`w-full text-left p-3 rounded-lg transition-colors ${selectedNoteId === note.id ? "bg-secondary" : "hover:bg-secondary/50"}`}
                  onClick={() => onNoteSelect(note.id)}
                >
                  <h3 className="font-medium text-sm mb-1 truncate">
                    {note.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {stripHtmlTags(note.content)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(note.updated_at)}
                  </p>
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDeleteNote(note.id)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Note
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotesSidebar;
