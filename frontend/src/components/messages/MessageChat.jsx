import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy } from "lucide-react";

export default function Message({ text }) {
  return (
    <div className="px-4 py-2">
      <ReactMarkdown
        components={{
          code({ inline, className, children }) {
            const code = String(children).trim();

            if (inline) {
              return (
                <code className="bg-[#111827] px-1 py-0.5 rounded text-blue-400">
                  {code}
                </code>
              );
            }

            return (
              <div className="relative group">
                {/* COPY BUTTON */}
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-[#1F2937] rounded"
                >
                  <Copy size={12} />
                </button>

                <SyntaxHighlighter
                  language="javascript"
                  style={{}}
                  customStyle={{
                    background: "#0D1117",
                    padding: "12px",
                    fontSize: "12px",
                    borderRadius: "6px",
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
