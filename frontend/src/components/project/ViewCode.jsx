import Editor from "@monaco-editor/react";

function getLanguage(filename) {
  if (filename.endsWith(".js") || filename.endsWith(".jsx"))
    return "javascript";
  if (filename.endsWith(".ts") || filename.endsWith(".tsx"))
    return "typescript";
  if (filename.endsWith(".json")) return "json";
  if (filename.endsWith(".html")) return "html";
  if (filename.endsWith(".css")) return "css";
  return "plaintext";
}

export function CodeViewer({ file }) {
  if (!file) {
    return (
      <div className="p-4 text-gray-500 text-xs">
        Select a file to view code
      </div>
    );
  }

  return (
    <div className="h-full">
      <Editor
        height="100%"
        theme="vs-dark"
        language={getLanguage(file.name)}
        value={file.content}
        options={{
          fontSize: 12,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
