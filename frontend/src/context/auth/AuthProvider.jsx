import React, { useEffect, useRef, useState } from "react";
import AuthContext from "./AuthContext";
import api from "../../config/axios";
import { setAccessToken } from "../../config/token";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Prevent double execution (VERY IMPORTANT)
  const hasInitialized = useRef(false);

  const getMe = async () => {
    try {
      const res = await api.get("/auth/getme");
      setUser(res.data);
    } catch (error) {
      console.log("getMe error:", error.response);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      await getMe();
    } catch (error) {
      console.log("getMe error:", error.response);
      setUser(null);
    }
  };

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const init = async () => {
      try {
        // 🔁 Refresh token
        const res = await api.post("/auth/refresh-token");

        const accessToken = res.data.accessToken;

        // ✅ Set token globally
        setAccessToken(accessToken);

        // ✅ Only call getMe AFTER token is set
        await getMe();
      } catch (err) {
        console.log("Not logged in:", err.response);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
    logout,
  };

  // 🔥 Prevent rendering before auth ready
  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
