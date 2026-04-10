import { useState } from "react";

import FileNode from "./FileTree";
import { CodeViewer } from "./ViewCode";

export default function ProjectPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const project = {
    name: "AI Project",
    files: [
      {
        type: "folder",
        name: "src",
        children: [
          {
            type: "file",
            name: "App.jsx",
            content: "function App() {\n  return <h1>Hello</h1>\n}",
          },
        ],
      },
      {
        type: "file",
        name: "package.json",
        content: '{ "name": "ai-project" }',
      },
    ],
  };

  return (
    <div className="h-full flex">
      {/* LEFT: TREE */}
      <div className="w-64 border-r border-[#1F2937]">
        {project.files.map((node, i) => (
          <FileNode key={i} node={node} onSelect={setSelectedFile} />
        ))}
      </div>

      {/* RIGHT: CODE */}
      <div className="flex-1">
        <CodeViewer file={selectedFile} />
      </div>
    </div>
  );
}
