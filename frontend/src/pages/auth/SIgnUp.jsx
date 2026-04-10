import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../apis/auth.api";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await authApi.registerApi(form);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const [socialLoading, setSocialLoading] = useState(null);

  const googleLogin = () => {
    try {
      setSocialLoading("google"); // 🔥 start loading
      authApi.googlelogin(); // redirects browser
    } catch (error) {
      setSocialLoading(null);
      console.log(error.response);
    }
  };

  const githubLogin = () => {
    try {
      setSocialLoading("github"); // 🔥 start loading
      authApi.githublogin(); // redirects browser
    } catch (error) {
      setSocialLoading(null);
      console.log(error.response);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0D1117] text-xs text-[#9CA3AF]">
      <div className="w-full max-w-sm border border-[#1F2937] rounded-xl p-6">
        {/* HEADER */}
        <div className="mb-6 text-center">
          <p className="text-white text-sm">Create your account</p>
          <p className="text-gray-500 text-[11px] mt-1">
            Set up your workspace and start building with AI.
          </p>
        </div>

        {/* SOCIAL */}
        <div className="space-y-2 mb-5">
          <button
            onClick={googleLogin}
            className="social-btn"
            disabled={socialLoading}
          >
            {socialLoading === "google" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-4 h-4"
                />
                Continue with Google
              </>
            )}
          </button>

          <button
            onClick={githubLogin}
            className="social-btn"
            disabled={socialLoading}
          >
            {socialLoading === "github" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  className="w-4 h-4 invert"
                />
                Continue with GitHub
              </>
            )}
          </button>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#1F2937]" />
          <span className="text-[11px] text-gray-500">or</span>
          <div className="flex-1 h-px bg-[#1F2937]" />
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* USERNAME */}
          <div>
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="input"
              name="username"
            />
            <p className="text-gray-500 text-[11px] mt-1">
              Choose a unique username for your profile.
            </p>
          </div>

          {/* FULL NAME */}
          <div>
            <input
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="input"
              name="fullname"
            />
            <p className="text-gray-500 text-[11px] mt-1">
              This helps personalize your experience.
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <input
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              name="email"
            />
            <p className="text-gray-500 text-[11px] mt-1">
              Used for login, updates, and security alerts.
            </p>
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input pr-10"
                name="password"
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="icon-btn"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>

            <p className="text-gray-500 text-[11px] mt-1">
              Use at least 6 characters. Strong passwords are recommended.
            </p>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-5 text-center text-[11px] text-gray-500">
          <p>
            By creating an account, you agree to our{" "}
            <span className="text-blue-400 cursor-pointer">Terms</span> and{" "}
            <span className="text-blue-400 cursor-pointer">Privacy Policy</span>
            .
          </p>

          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
