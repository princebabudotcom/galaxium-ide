import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import router from "./routes/AppRoutes";
import { ToastProvider } from "./components/layout/Popup";

createRoot(document.getElementById("root")).render(
  <>
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  </>,
);
