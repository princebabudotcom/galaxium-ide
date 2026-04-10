import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Bell, Settings } from "lucide-react";

export default function TopMenuBar() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-9 bg-[#0D1117] border-b border-[#1f2937] flex items-center justify-between px-3 text-xs">
      {/* LEFT MENU */}
      <div className="flex items-center gap-3 text-gray-400">
        <span className="font-semibold text-white text-xs">Galaxium</span>

        <MenuLink to="/project" label="Project" />
        <MenuLink to="/agents" label="Agents" />
        <MenuLink to="/commands" label="Commands" />
        <MenuLink to="/view" label="View" />
        <MenuLink to="/run" label="Run" />
        <MenuLink to="/system" label="System" />
        <MenuLink to="/help" label="Help" />
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center gap-1.5 bg-[#111827] px-2 py-0.5 rounded border border-[#1f2937] text-gray-300">
        <span className="text-gray-500">Project:</span>
        <span className="text-white font-medium">Galaxium Auth</span>
        <ChevronDown size={12} />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 text-gray-400">
        <span className="text-green-400 text-[10px]">● GPT-4o</span>

        <Bell size={14} className="cursor-pointer hover:text-white" />
        <Settings
          onClick={() => navigate("/settings")}
          size={14}
          className="cursor-pointer hover:text-white"
        />

        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
          P
        </div>
      </div>
    </div>
  );
}

function MenuLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-1 py-[2px] transition ${
          isActive ? "text-white border-b border-blue-500" : "hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
