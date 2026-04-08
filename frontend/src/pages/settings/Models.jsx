import { useState } from "react";

export default function ModelsPage() {
  const [activeModel, setActiveModel] = useState("gpt-4o");

  const [autoFallback, setAutoFallback] = useState(true);
  const [fastMode, setFastMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const models = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      desc: "Best balance of speed and intelligence",
    },
    {
      id: "gpt-4.1",
      name: "GPT-4.1",
      provider: "OpenAI",
      desc: "More accurate, slower responses",
    },
    {
      id: "claude-3",
      name: "Claude 3",
      provider: "Anthropic",
      desc: "Strong reasoning and long context",
    },
  ];

  const handleSave = async () => {
    setLoading(true);

    // simulate API call
    await new Promise((res) => setTimeout(res, 1200));

    console.log({
      activeModel,
      autoFallback,
      fastMode,
    });

    setLoading(false);
  };

  return (
    <div className="flex justify-center h-full overflow-auto">
      <div className="w-full max-w-2xl text-xs text-[#9CA3AF] border border-[#1F2937] rounded flex flex-col">
        {/* HEADER */}
        <div className="px-4 py-3 border-b border-[#1F2937]">
          <h1 className="text-sm text-white">Models</h1>
        </div>

        <div className="p-4 space-y-4 flex-1">
          {/* 🔹 MODEL LIST */}
          <Section title="Available Models">
            <div className="space-y-2">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  active={activeModel === model.id}
                  onClick={() => setActiveModel(model.id)}
                />
              ))}
            </div>
          </Section>

          {/* 🔹 SETTINGS */}
          <Section title="Model Settings">
            <Toggle
              label="Auto Fallback (switch if model fails)"
              checked={autoFallback}
              onChange={setAutoFallback}
            />

            <Toggle
              label="Use Fast Mode (optimize for speed)"
              checked={fastMode}
              onChange={setFastMode}
            />
          </Section>
        </div>

        {/* SAVE */}
        <div className="p-3 border-t border-[#1F2937] flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-1.5 text-xs rounded text-white flex items-center gap-2
            ${
              loading
                ? "bg-blue-500 opacity-70 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 MODEL CARD */
function ModelCard({ model, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border rounded p-3 cursor-pointer transition
      ${
        active
          ? "border-blue-500 bg-[#111827]"
          : "border-[#1F2937] hover:bg-[#111827]"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white text-xs">{model.name}</p>
          <p className="text-gray-400 text-[11px]">{model.provider}</p>
        </div>

        {active && <span className="text-[10px] text-blue-400">Active</span>}
      </div>

      <p className="text-[11px] text-gray-500 mt-1">{model.desc}</p>
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
      <div className="p-3 space-y-2">{children}</div>
    </div>
  );
}

/* 🔹 FIXED TOGGLE */
function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between px-2 py-2 hover:bg-[#111827] rounded">
      <span>{label}</span>

      <div
        onClick={() => onChange(!checked)}
        className={`w-8 h-4 flex items-center rounded-full p-0.5 cursor-pointer transition
        ${checked ? "bg-blue-500" : "bg-gray-600"}`}
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
