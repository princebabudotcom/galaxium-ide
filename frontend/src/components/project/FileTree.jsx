import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder } from "lucide-react";

function FileNode({ node, onSelect }) {
  const [open, setOpen] = useState(false);

  if (node.type === "file") {
    return (
      <div
        onClick={() => onSelect(node)}
        className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#111827]"
      >
        <File size={12} />
        {node.name}
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:bg-[#111827]"
      >
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        <Folder size={12} />
        {node.name}
      </div>

      {open && (
        <div className="ml-4">
          {node.children.map((child, i) => (
            <FileNode key={i} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileNode;
