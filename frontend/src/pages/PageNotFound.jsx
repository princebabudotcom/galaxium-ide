import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-[#0D1117] text-xs text-[#9CA3AF]">
      <div className="flex flex-col items-center gap-3">
        {/* TITLE */}
        <p className="text-sm text-white">Page not found</p>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-center max-w-xs">
          The page you’re trying to access doesn’t exist or has been moved.
        </p>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded border border-[#1F2937] hover:bg-[#111827] text-white transition"
          >
            <ArrowLeft size={12} />
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
