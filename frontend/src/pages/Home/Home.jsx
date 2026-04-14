import { useEffect, useState } from "react";
import socket from "../../config/socket.config";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [command, setCommand] = useState("frontend");
  const [activeTab, setActiveTab] = useState("preview");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Send Message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      role: "user",
      command,
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    socket.emit("ai-message", {
      command,
      content: input,
    });

    setInput("");
  };

  // 🔹 Socket Setup
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("ai-response", (data) => {
      console.log("AI:", data);

      setCode(data); // full HTML
      setLoading(false);

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Website generated ✅" },
      ]);
    });

    socket.on("ai-error", (err) => {
      console.error(err);
      setLoading(false);

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error generating website ❌" },
      ]);
    });

    return () => {
      socket.off("ai-response");
      socket.off("ai-error");
      socket.disconnect();
    };
  }, []);

  // 🔹 Preview Builder
  const buildPreview = () => {
    return code || "<h1 style='color:black'>No Preview</h1>";
  };

  return (
    <div className="h-[calc(100vh-36px)] flex bg-black text-white text-xs overflow-hidden">
      {/* LEFT: CHAT */}
      <div className="w-1/3 border-r border-gray-900 flex flex-col min-h-0">
        {/* Header */}
        <div className="h-10 px-3 flex items-center border-b border-gray-900 font-semibold">
          AI Chat
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col gap-1">
              {msg.role === "user" ? (
                <div className="ml-auto max-w-[80%]">
                  <div className="bg-blue-600 px-3 py-2 rounded-xl">
                    <div className="text-[10px] opacity-70 mb-1">
                      {msg.command}
                    </div>
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="max-w-[80%]">
                  <div className="bg-[#111] px-3 py-2 rounded-xl">
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="border-t border-gray-900 p-2"
        >
          <div className="flex items-center bg-[#111] rounded-lg overflow-hidden">
            <select
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="bg-black px-2 py-2 outline-none text-gray-400"
            >
              <option value="frontend">/frontend</option>
              <option value="edit">/edit</option>
              <option value="fix">/fix</option>
              <option value="explain">/explain</option>
            </select>

            <input
              className="flex-1 bg-transparent px-2 py-2 outline-none"
              placeholder="Type your prompt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button type="submit" className="p-2 hover:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Tabs */}
        <div className="h-10 flex border-b border-gray-900">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 ${
              activeTab === "preview" ? "bg-[#111]" : "text-gray-500"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 ${
              activeTab === "code" ? "bg-[#111]" : "text-gray-500"
            }`}
          >
            Code
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* PREVIEW */}
          {activeTab === "preview" &&
            (loading ? (
              <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
                Generating website...
              </div>
            ) : (
              <iframe
                title="preview"
                srcDoc={buildPreview()}
                className="w-full h-full bg-white"
              />
            ))}

          {/* CODE */}
          {activeTab === "code" && (
            <div className="h-full p-2">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                </div>
              ) : (
                <textarea
                  className="w-full h-full bg-[#111] p-2 rounded outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
