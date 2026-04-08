import { Outlet } from "react-router-dom";
import SettingsMenu from "../../components/layout/SettingsMenu";

export default function SettingsLayout() {
  return (
    <div className="flex h-[calc(100vh-36px)] bg-[#0b0b0b] text-[#9CA3AF] text-xs">
      {/* 🔹 LEFT MENU */}
      <SettingsMenu />

      {/* 🔹 RIGHT CONTENT */}
      <div className="flex-1 overflow-auto min-h-0">
        <div className="p-6 max-w-4xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
