import { useState } from "react";
import { Bell, Check, AlertCircle, Info } from "lucide-react";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "ai",
      title: "AI completed deployment",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "error",
      title: "Build failed on production",
      time: "10 min ago",
    },
    {
      id: 3,
      type: "system",
      title: "System update available",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="flex justify-center h-full overflow-auto">
      <div className="w-full max-w-2xl text-xs text-[#9CA3AF] border border-[#1F2937] rounded">
        {/* HEADER */}
        <div className="px-4 py-3 border-b border-[#1F2937] flex items-center justify-between">
          <h1 className="text-sm text-white">Notifications</h1>
          <Bell size={14} />
        </div>

        {/* FILTER */}
        <div className="flex gap-2 px-3 py-2 border-b border-[#1F2937]">
          {["all", "ai", "system", "error"].map((f) => (
            <Filter key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </Filter>
          ))}
        </div>

        {/* LIST */}
        <div className="divide-y divide-[#1F2937]">
          {notifications
            .filter((n) => filter === "all" || n.type === filter)
            .map((n) => (
              <NotificationItem key={n.id} {...n} />
            ))}
        </div>
      </div>
    </div>
  );
}

/* 🔹 FILTER CHIP */
function Filter({ children, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-2 py-1 rounded cursor-pointer capitalize ${
        active ? "bg-[#111827] text-white" : "hover:bg-[#111827]"
      }`}
    >
      {children}
    </div>
  );
}

/* 🔹 ITEM */
function NotificationItem({ type, title, time }) {
  const iconMap = {
    ai: <Info size={14} className="text-blue-400" />,
    error: <AlertCircle size={14} className="text-red-400" />,
    system: <Check size={14} className="text-green-400" />,
  };

  return (
    <div className="flex items-start gap-3 px-3 py-3 hover:bg-[#111827]">
      <div className="mt-0.5">{iconMap[type]}</div>

      <div className="flex-1">
        <p className="text-white">{title}</p>
        <p className="text-gray-500 text-[11px]">{time}</p>
      </div>
    </div>
  );
}
