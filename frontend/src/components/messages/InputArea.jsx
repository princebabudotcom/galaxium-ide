import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t border-[#1F2937] p-2 flex items-end gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask AI or generate code..."
        rows={1}
        className="flex-1 resize-none bg-[#0D1117] border border-[#1F2937] rounded px-3 py-2 outline-none focus:border-blue-500 text-xs"
      />

      <button
        onClick={handleSend}
        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        <Send size={14} />
      </button>
    </div>
  );
}
