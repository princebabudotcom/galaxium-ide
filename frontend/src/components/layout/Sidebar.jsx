import { NavLink } from "react-router-dom";
import {
  FileText,
  Search,
  GitBranch,
  Play,
  Bug,
  Boxes,
  Wrench,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-14 h-full bg-[#000] border-r border-[#1F2937] flex flex-col justify-between items-center py-3">
      {/* LOGO */}

      {/* MAIN */}
      <div className="flex flex-col gap-4 items-center flex-1 mt-4">
        <Item to="/" icon={<FileText size={18} />} />
        <Item to="/search" icon={<Search size={18} />} />
        <Item to="/agents" icon={<GitBranch size={18} />} badge="45" />
        <Item to="/commands" icon={<Play size={18} />} />
        <Item to="/debug" icon={<Bug size={18} />} />
        <Item to="/projects" icon={<Boxes size={18} />} />
        <Item to="/tools" icon={<Wrench size={18} />} />
      </div>

      {/* BOTTOM */}
      <div className="mb-2">
        <Item to="/logout" icon={<LogOut size={18} />} />
      </div>
    </div>
  );
}

function Item({ to, icon, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center justify-center w-10 h-10 rounded-lg transition
        ${
          isActive
            ? "bg-[#111827] text-white"
            : "text-[#9CA3AF] hover:text-white hover:bg-[#111827]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 w-[3px] h-6 bg-blue-500 rounded-r-md" />
          )}

          {icon}

          {badge && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-[10px] px-1.5 py-[1px] rounded-full text-white">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
