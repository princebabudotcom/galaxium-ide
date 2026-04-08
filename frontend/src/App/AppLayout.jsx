import { Outlet } from "react-router-dom";
import TopMenuBar from "../components/layout/Menubar";
import Sidebar from "../components/layout/Sidebar";

export default function Layout() {
  return (
    <div className="h-screen bg-[#000] text-[#9CA3AF] overflow-hidden">
      {/* 🔹 TOPBAR (fixed at top) */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopMenuBar />
      </div>

      {/* 🔹 SIDEBAR (fixed left, below topbar) */}
      <div className="fixed top-9 left-0 h-[calc(100vh-36px)] z-40">
        <Sidebar />
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="ml-14 mt-9 h-[calc(100vh-36px)] overflow-auto">
        <main className="h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
