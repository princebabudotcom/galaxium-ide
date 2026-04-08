import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/auth/UseAuth";

export default function LogoutPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-[#0D1117] text-xs text-[#9CA3AF]">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1F2937]">
        <p className="text-white text-sm">Session</p>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-3 space-y-4">
        {/* SECTION */}
        <div>
          <p className="text-[11px] text-gray-500 mb-2">Authentication</p>

          <div className="border border-[#1F2937] divide-y divide-[#1F2937] rounded">
            {/* INFO ROW */}
            <div className="px-3 py-2 text-gray-400">
              You are currently signed in to your account.
            </div>

            {/* LOGOUT ROW */}
            <div className="flex items-center justify-between px-3 py-2 hover:bg-[#111827]">
              <div className="flex flex-col">
                <span className="text-white">Sign out</span>
                <span className="text-gray-500 text-[11px]">
                  End your current session on this device
                </span>
              </div>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
