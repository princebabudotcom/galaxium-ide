import { useState } from "react";
import { RefreshCw, Trash2, AlertTriangle } from "lucide-react";

export default function SystemPage() {
  const [debug, setDebug] = useState(false);

  return (
    <div className="flex justify-center h-full overflow-auto">
      <div className="w-full max-w-2xl text-xs text-[#9CA3AF] border border-[#1F2937] rounded">
        {/* HEADER */}
        <div className="px-4 py-3 border-b border-[#1F2937]">
          <h1 className="text-sm text-white">System</h1>
        </div>

        <div className="p-4 space-y-4">
          {/* 🔹 SYSTEM INFO */}
          <Section title="System Info">
            <Item label="App Version" value="v1.0.0" />
            <Item label="Environment" value="Development" />
            <Item label="Status" value="Healthy" />
          </Section>

          {/* 🔹 STORAGE */}
          <Section title="Storage & Cache">
            <Row label="Cache Size">
              <span className="text-white">12 MB</span>
            </Row>

            <ActionBtn
              icon={<Trash2 size={12} />}
              label="Clear Cache"
              danger
              onClick={() => console.log("clear cache")}
            />
          </Section>

          {/* 🔹 AI SYSTEM */}
          <Section title="AI System">
            <ActionBtn
              icon={<RefreshCw size={12} />}
              label="Reset AI Memory"
              onClick={() => console.log("reset memory")}
            />

            <ActionBtn
              icon={<RefreshCw size={12} />}
              label="Reset AI Configuration"
              onClick={() => console.log("reset config")}
            />
          </Section>

          {/* 🔹 DEBUG */}
          <Section title="Debug">
            <Toggle
              label="Enable Debug Mode"
              checked={debug}
              onChange={setDebug}
            />

            <ActionBtn
              icon={<AlertTriangle size={12} />}
              label="View Logs"
              onClick={() => console.log("open logs")}
            />
          </Section>

          {/* 🔹 DANGER ZONE */}
          <Section title="Danger Zone">
            <ActionBtn
              icon={<Trash2 size={12} />}
              label="Reset Application"
              danger
            />

            <ActionBtn
              icon={<Trash2 size={12} />}
              label="Delete Account"
              danger
            />
          </Section>
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

/* 🔹 ITEM */
function Item({ label, value }) {
  return (
    <div className="flex justify-between px-2 py-1.5 hover:bg-[#111827] rounded">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

/* 🔹 ROW */
function Row({ label, children }) {
  return (
    <div className="flex justify-between px-2 py-1.5">
      <span className="text-gray-400">{label}</span>
      {children}
    </div>
  );
}

/* 🔹 ACTION BUTTON */
function ActionBtn({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1.5 rounded w-full text-left transition
      ${danger ? "text-red-400 hover:bg-red-500/10" : "hover:bg-[#111827]"}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* 🔹 TOGGLE */
function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between px-2 py-2 hover:bg-[#111827] rounded">
      <span>{label}</span>
      <div
        onClick={() => onChange(!checked)}
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
