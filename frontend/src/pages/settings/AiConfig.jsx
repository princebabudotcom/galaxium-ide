import { useState } from "react";

export default function AIConfigPage() {
  const [streaming, setStreaming] = useState(true);
  const [autoExecute, setAutoExecute] = useState(false);
  const [memory, setMemory] = useState(true);
  const [style, setStyle] = useState("friendly");

  return (
    <div className="flex justify-center h-full overflow-auto">
      <div className="w-full max-w-2xl text-xs text-[#9CA3AF] border border-[#1F2937] rounded flex flex-col">
        {/* HEADER */}
        <div className="px-4 py-3 border-b border-[#1F2937]">
          <h1 className="text-sm text-white">AI Configuration</h1>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-4 flex-1">
          {/* 🔹 MODEL */}
          <Section title="Model Selection">
            <Row label="Model">
              <select className="input">
                <option>GPT-4o</option>
                <option>GPT-4.1</option>
                <option>Claude 3</option>
              </select>
            </Row>

            <Toggle label="Auto Select Best Model" />
          </Section>

          {/* 🔹 GENERATION */}
          <Section title="Generation Settings">
            <Row label="Temperature">
              <input className="input" placeholder="0.7" />
            </Row>

            <Row label="Max Tokens">
              <input className="input" placeholder="2048" />
            </Row>

            <Row label="Top P">
              <input className="input" placeholder="1.0" />
            </Row>

            <Row label="Frequency Penalty">
              <input className="input" placeholder="0.0" />
            </Row>

            <Row label="Presence Penalty">
              <input className="input" placeholder="0.0" />
            </Row>
          </Section>

          {/* 🔹 TALK STYLE (NEW) */}
          <Section title="Response Style">
            <div className="flex flex-wrap gap-2">
              {[
                "friendly",
                "professional",
                "developer",
                "strict",
                "creative",
              ].map((s) => (
                <div
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-3 py-1 rounded cursor-pointer border text-xs transition
                  ${
                    style === s
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-[#1F2937] hover:bg-[#111827]"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </Section>

          {/* 🔹 BEHAVIOR */}
          <Section title="Behavior & Instructions">
            <div>
              <p className="text-gray-400 mb-1">System Instructions</p>
              <textarea
                className="w-full bg-[#111827] border border-[#1F2937] p-2 rounded outline-none text-xs"
                rows={4}
                placeholder="You are an AI developer assistant..."
              />
            </div>

            <Toggle
              label="Enable Context Memory"
              checked={memory}
              onChange={setMemory}
            />
          </Section>

          {/* 🔹 EXECUTION */}
          <Section title="Execution & Safety">
            <Toggle
              label="Auto Execute Commands"
              checked={autoExecute}
              onChange={setAutoExecute}
            />
            <Toggle
              label="Streaming Responses"
              checked={streaming}
              onChange={setStreaming}
            />
            <Toggle label="Safe Mode (restrict risky actions)" />
          </Section>
        </div>

        {/* 🔹 SAVE BUTTON (NEW) */}
        <div className="p-3 border-t border-[#1F2937] flex justify-end">
          <button className="px-4 py-1.5 text-xs rounded bg-blue-600 hover:bg-blue-700 text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 SECTION */
function Section({ title, children }) {
  return (
    <div className="border border-[#1F2937] rounded">
      <div className="px-3 py-2 border-b border-[#1F2937] text-[11px] text-gray-500">
        {title}
      </div>
      <div className="p-3 space-y-3">{children}</div>
    </div>
  );
}

/* 🔹 ROW */
function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-400">{label}</span>
      <div className="w-56">{children}</div>
    </div>
  );
}

/* 🔹 TOGGLE */
function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between px-2 py-2 hover:bg-[#111827] rounded">
      <span>{label}</span>
      <div
        onClick={() => onChange && onChange(!checked)}
        className={`w-8 h-4 flex items-center rounded-full p-0.5 cursor-pointer ${
          checked ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <div
          className={`w-3 h-3 bg-white rounded-full transform transition ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </div>
    </div>
  );
}
