import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../apis/auth.api";
import { useToast } from "../../components/layout/Popup";

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const { addToast } = useToast();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  // values: "google" | "github" | null

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.identifier) newErrors.identifier = "Required";
    if (!form.password) newErrors.password = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await authApi.loginApi(form);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    addToast("Login page");
  }, []);
  return (
    <div className="h-screen flex items-center justify-center bg-[#0D1117] text-xs text-[#9CA3AF]">
      <div className="w-full max-w-sm border border-[#1F2937] rounded-md p-6">
        {/* TITLE */}
        <div className="mb-6 text-center">
          <p className="text-white text-sm">Sign in to Galaxium</p>
          <p className="text-gray-500 text-[11px] mt-1">
            Access your workspace and continue building with AI.
          </p>
        </div>

        {/* 🔹 SOCIAL LOGIN */}
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
        <form onSubmit={handleLogin} className="space-y-4">
          {/* IDENTIFIER */}
          <div>
            <input
              type="text"
              placeholder="Email or username"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              className="input"
              name="email"
            />
            <p className="text-gray-500 text-[11px] mt-1">
              Use your registered email or username
            </p>
            {errors.identifier && (
              <p className="text-red-400 text-[11px]">{errors.identifier}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input pr-9"
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
              Must be at least 6 characters
            </p>

            {errors.password && (
              <p className="text-red-400 text-[11px]">{errors.password}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-5 text-center text-[11px] text-gray-500">
          <Link to="/auth/forgot-password" className="text-blue-400">
            Forgot password?
          </Link>
          <div className="mt-1">
            New here?{" "}
            <Link to="/auth/signup" className="text-blue-400">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
