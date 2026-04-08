import { useState } from "react";
import { RefreshCw, Pencil, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="flex justify-center h-full overflow-auto">
      <div className="w-full max-w-2xl text-xs text-[#9CA3AF] border border-[#1F2937] rounded">
        {/* 🔹 HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F2937]">
          <h1 className="text-sm text-white">Profile</h1>

          <div className="flex items-center gap-2">
            <IconBtn onClick={handleRefresh}>
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </IconBtn>

            <IconBtn onClick={() => setEdit(!edit)}>
              <Pencil size={14} />
            </IconBtn>

            <IconBtn className="hover:text-red-400">
              <LogOut size={14} />
            </IconBtn>
          </div>
        </div>

        {/* 🔹 CONTENT */}
        <div className="p-4">
          {!edit ? (
            <>
              {/* USER INFO */}
              <Section title="User Information">
                <Item label="Full Name" value="Prince Babu" />
                <Item label="Username" value="@galaxium" />
                <Item label="Email" value="you@example.com" />
                <Item label="Role" value="Developer" />
                <Item label="Verified" value="Yes" />
                <Item label="Badge" value="Pro User" />
                <Item label="Bio" value="Building AI-powered tools 🚀" />
              </Section>

              {/* TOGGLE */}
              <div className="mt-4 border border-[#1F2937] rounded px-3 py-2 flex items-center justify-between">
                <span>Public Profile</span>
                <Toggle checked={publicProfile} onChange={setPublicProfile} />
              </div>
            </>
          ) : (
            <Section title="Edit Profile">
              <Input label="Full Name" defaultValue="Prince Babu" />
              <Input label="Username" defaultValue="galaxium" />
              <Input label="Email" defaultValue="you@example.com" />
              <Input label="Role" defaultValue="Developer" />
              <Input label="Bio" defaultValue="Building AI-powered tools 🚀" />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  onClick={() => setEdit(false)}
                  className="px-3 py-1 rounded bg-[#111827] hover:bg-[#1F2937]"
                >
                  Cancel
                </button>
                <button className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white">
                  Save
                </button>
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/* 🔹 SECTION */
function Section({ title, children }) {
  return (
    <div className="mb-4 border border-[#1F2937] rounded">
      <div className="px-3 py-2 border-b border-[#1F2937] text-[11px] text-gray-500">
        {title}
      </div>
      <div className="p-2 space-y-2">{children}</div>
    </div>
  );
}

/* 🔹 VIEW ITEM */
function Item({ label, value }) {
  return (
    <div className="flex justify-between px-2 py-1.5 rounded hover:bg-[#111827]">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

/* 🔹 INPUT */
function Input({ label, defaultValue }) {
  return (
    <div>
      <p className="text-gray-400 mb-1">{label}</p>
      <input
        defaultValue={defaultValue}
        className="w-full bg-[#111827] border border-[#1F2937] px-2 py-1.5 rounded outline-none text-xs"
      />
    </div>
  );
}

/* 🔹 ICON BUTTON */
function IconBtn({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded hover:bg-[#111827] transition ${className}`}
    >
      {children}
    </button>
  );
}

/* 🔹 TOGGLE */
function Toggle({ checked, onChange }) {
  return (
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
  );
}
