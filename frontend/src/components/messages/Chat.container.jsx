import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";

/* ---------- README BLOCK ---------- */

const ReadmeBlock = ({ initial }) => {
  const [mode, setMode] = useState("preview"); // preview | edit
  const [content, setContent] = useState(initial);

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs">
        <span className="text-[#8b949e]">README.md</span>

        <div className="flex gap-2">
          <button
            onClick={() => setMode("edit")}
            className={`px-2 py-1 rounded ${
              mode === "edit" ? "bg-[#30363d]" : "hover:bg-[#21262d]"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`px-2 py-1 rounded ${
              mode === "preview" ? "bg-[#30363d]" : "hover:bg-[#21262d]"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Content */}
      {mode === "edit" ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 bg-[#0d1117] text-[#c9d1d9] p-4 text-[13px] outline-none resize-none"
        />
      ) : (
        <div className="p-6 prose prose-invert max-w-none text-[14px]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

/* ---------- CHAT MESSAGE ---------- */

const Message = ({ msg }) => (
  <div className="space-y-4">
    <div className="text-xs text-[#6e7681] uppercase">
      {msg.type === "user" ? "You" : "AI"}
    </div>

    {msg.blocks.map((b, i) => {
      if (b.type === "text") {
        return <p key={i}>{b.content}</p>;
      }

      if (b.type === "readme") {
        return <ReadmeBlock key={i} initial={b.content} />;
      }

      return null;
    })}
  </div>
);

/* ---------- MAIN CHAT ---------- */

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      blocks: [
        { type: "text", content: "Project Planning 📄" },
        {
          type: "readme",
          content: `# Project Setup

## Features
- Auth system
- Dashboard
- API integration

## Tech Stack
- React
- Node.js
- MongoDB

## Steps
1. Setup backend
2. Connect database
3. Build UI`,
        },
      ],
    },
  ]);

  const [input, setInput] = useState("");

  const send = () => {
    if (!input) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", blocks: [{ type: "text", content: input }] },
      {
        type: "ai",
        blocks: [
          { type: "text", content: "Updated README:" },
          {
            type: "readme",
            content: `# Updated Plan

## New Feature
- AI Integration

## Next Steps
- Add API routes
- Test endpoints`,
          },
        ],
      },
    ]);

    setInput("");
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1117] text-[#c9d1d9]">
      {/* Messages */}
      <div className="flex-1 overflow-auto px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-10">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#30363d] p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <textarea
            rows={2}
            className="flex-1 bg-[#161b22] border border-[#30363d] px-3 py-2 rounded text-sm outline-none resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button
            onClick={send}
            className="bg-[#238636] px-4 rounded text-sm hover:bg-[#2ea043]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
