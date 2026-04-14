import { useState } from "react";
import { Folder, FolderPlus } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProjectPage() {
  const navigate = useNavigate();

  // 🔹 Projects
  const [projects, setProjects] = useState([
    { id: 1, name: "galaxium-ai" },
    { id: 2, name: "portfolio-site" },
  ]);

  // 🔹 Modal + Steps
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "fullstack",
    visibility: "private",
    stack: {
      frontend: "",
      backend: "",
    },
  });

  // 🔹 Create Project
  const handleCreate = () => {
    if (!form.name.trim()) return;

    const newProj = {
      id: Date.now(),
      name: form.name,
    };

    setProjects([...projects, newProj]);

    setShowModal(false);
    setStep(1);
    setForm({
      name: "",
      description: "",
      type: "fullstack",
      visibility: "private",
      stack: { frontend: "", backend: "" },
    });

    navigate(`/project/${newProj.id}`);
  };

  return (
    <div className="h-screen flex bg-[#0D1117] text-xs text-[#9CA3AF]">
      {/* 🔹 LEFT SIDEBAR */}
      <div className="w-64 border-r border-[#1F2937] flex flex-col">
        <div className="px-3 py-2 border-b border-[#1F2937] flex items-center justify-between">
          <span className="text-gray-400 text-[11px]">EXPLORER</span>

          <FolderPlus
            size={14}
            className="cursor-pointer hover:text-white"
            onClick={() => setShowModal(true)}
          />
        </div>

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

      {/* 🔹 RIGHT PANEL */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-[500px] bg-[#0D1117] border border-[#1F2937] rounded-xl p-6 shadow-xl">
            {/* HEADER */}
            <h2 className="text-white text-sm mb-4">
              Create Project (Step {step}/3)
            </h2>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-3">
                <input
                  placeholder="Project Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#111827] px-3 py-2 rounded border border-[#1F2937]"
                />

                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full bg-[#111827] px-3 py-2 rounded border border-[#1F2937]"
                />
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-3">
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[#111827] px-3 py-2 rounded border border-[#1F2937]"
                >
                  <option value="fullstack">Fullstack</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="api">API</option>
                </select>

                <select
                  value={form.visibility}
                  onChange={(e) =>
                    setForm({ ...form, visibility: e.target.value })
                  }
                  className="w-full bg-[#111827] px-3 py-2 rounded border border-[#1F2937]"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-3">
                <input
                  placeholder="Frontend (React, HTML...)"
                  value={form.stack.frontend}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      stack: {
                        ...form.stack,
                        frontend: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#111827] px-3 py-2 rounded border border-[#1F2937]"
                />

                <input
                  placeholder="Backend (Node, Django...)"
                  value={form.stack.backend}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      stack: {
                        ...form.stack,
                        backend: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#111827] px-3 py-2 rounded border border-[#1F2937]"
                />
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() =>
                  step > 1 ? setStep(step - 1) : setShowModal(false)
                }
                className="px-3 py-1 bg-[#1F2937] rounded"
              >
                {step === 1 ? "Cancel" : "Back"}
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-3 py-1 bg-blue-600 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  className="px-3 py-1 bg-green-600 rounded"
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
