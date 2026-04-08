import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import authApi from "../../apis/auth.api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    try {
      await authApi.forgotPasswordApi({ email });
      setSent(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0D1117] text-xs text-[#9CA3AF]">
      <div className="w-full max-w-sm border border-[#1F2937] rounded-md p-6">
        {/* HEADER */}
        <div className="mb-6 text-center">
          <p className="text-white text-sm">Reset your password</p>
          <p className="text-gray-500 text-[11px] mt-1">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        {/* SUCCESS STATE */}
        {sent ? (
          <div className="text-center space-y-3">
            <Mail size={18} className="mx-auto text-gray-400" />

            <p className="text-white text-sm">Check your email</p>

            <p className="text-gray-500 text-[11px]">
              If an account exists, a password reset link has been sent.
            </p>

            <Link to="/auth/login" className="inline-block mt-2 text-blue-400">
              Back to login
            </Link>
          </div>
        ) : (
          <>
            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />

                <p className="text-gray-500 text-[11px] mt-1">
                  Use the email associated with your account.
                </p>
              </div>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? "Sending link..." : "Send reset link"}
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-5 text-center text-[11px] text-gray-500">
              Remember your password?{" "}
              <Link to="/auth/login" className="text-blue-400">
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
