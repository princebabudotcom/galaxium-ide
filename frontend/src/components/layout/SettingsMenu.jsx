import { NavLink } from "react-router-dom";
import {
  User,
  Bot,
  Cpu,
  Layout,
  Bell,
  Settings as SettingsIcon,
} from "lucide-react";

export default function SettingsMenu() {
  const menu = [
    { to: "/settings/profile", label: "Profile", icon: <User size={14} /> },
    { to: "/settings/models", label: "Models", icon: <Bot size={14} /> },
    { to: "/settings/ai", label: "AI Config", icon: <Cpu size={14} /> },
    {
      to: "/settings/workspace",
      label: "Workspace",
      icon: <Layout size={14} />,
    },
    {
      to: "/settings/notifications",
      label: "Notifications",
      icon: <Bell size={14} />,
    },
    {
      to: "/settings/system",
      label: "System",
      icon: <SettingsIcon size={14} />,
    },
  ];

  return (
    <div className="w-56 border-r border-[#1F2937] flex flex-col">
      {/* HEADER */}
      <div className="px-3 py-3 text-gray-400 border-b border-[#1F2937]">
        Settings
      </div>

      {/* MENU */}
      <div className="flex-1 p-2 space-y-1 overflow-auto">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition
              ${
                isActive
                  ? "bg-[#050912] text-white"
                  : "text-[#9CA3AF] hover:bg-[#09090b] hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
