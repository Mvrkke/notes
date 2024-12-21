import React from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

const EditorToolbar = () => {
  return (
    <div className="flex items-center gap-1 border rounded-lg p-1 w-fit">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EditorToolbar;
