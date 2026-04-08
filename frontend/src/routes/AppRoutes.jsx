import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../App/PublicLayout";
import AppLayout from "../App/AppLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./PrivateRoute";

// Auth Pages
import LoginPage from "../pages/auth/Login";
import SignupPage from "../pages/auth/SIgnUp";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import SettingsPage from "../pages/settings/Settings";
import ProfilePage from "../pages/settings/Profile";
import AIConfigPage from "../pages/settings/AiConfig";
import NotificationsPage from "../pages/settings/Notifications";
import SystemPage from "../pages/settings/System";
import ModelsPage from "../pages/settings/Models";
import NotFoundPage from "../pages/PageNotFound";
import LogoutPage from "../pages/auth/Logout";

const router = createBrowserRouter([
  /* ---------------- PUBLIC ---------------- */
  {
    path: "/auth",
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Home page</div>,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />, // 🔥 NOT SettingsPage
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "models",
            element: <ModelsPage />,
          },
          {
            path: "ai",
            element: <AIConfigPage />,
          },
          {
            path: "workspace",
            element: <div>Workspace</div>,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
          {
            path: "system",
            element: <SystemPage />,
          },
        ],
      },
    ],
  },
  /* ---------------- 404 ---------------- */
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
