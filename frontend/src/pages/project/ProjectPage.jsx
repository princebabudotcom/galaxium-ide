import { useState } from "react";
import { Folder, FolderPlus } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProjectPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([
    { id: 1, name: "galaxium-ai" },
    { id: 2, name: "portfolio-site" },
  ]);

  const [newProject, setNewProject] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = () => {
    if (!newProject.trim()) return;

    const newProj = {
      id: Date.now(),
      name: newProject,
    };

    setProjects([...projects, newProj]);

    setNewProject("");
    setCreating(false);

    // 👉 open newly created project
    navigate(`/project/${newProj.id}`);
  };

  return (
    <div className="h-full flex bg-[#0D1117] text-xs text-[#9CA3AF]">
      {/* 🔹 LEFT PANEL (Explorer) */}
      <div className="w-64 border-r border-[#1F2937] flex flex-col">
        {/* HEADER */}
        <div className="px-3 py-2 border-b border-[#1F2937] flex items-center justify-between">
          <span className="text-gray-400 text-[11px]">EXPLORER</span>

          <FolderPlus
            size={14}
            className="cursor-pointer hover:text-white"
            onClick={() => setCreating(true)}
          />
        </div>

        {/* CREATE INPUT */}
        {creating && (
          <div className="p-2 border-b border-[#1F2937]">
            <input
              autoFocus
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="New project name"
              className="w-full bg-[#111827] border border-[#1F2937] px-2 py-1 rounded outline-none text-xs"
            />
          </div>
        )}

        {/* PROJECT LIST */}
        <div className="flex-1 overflow-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#111827]"
            >
              <Folder size={14} />
              <span>{project.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 RIGHT PANEL (ACTIVE VIEW) */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
