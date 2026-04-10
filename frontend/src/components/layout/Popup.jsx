// context/ToastContext.jsx

import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    // auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Global UI */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="w-[320px] bg-[#252526] border border-[#3c3c3c] shadow-md flex items-start gap-3 px-3 py-2"
          >
            {/* ICON */}
            <div className="mt-[2px]">
              {t.type === "success" && (
                <span className="text-[#89d185] text-sm">✔</span>
              )}
              {t.type === "error" && (
                <span className="text-[#f48771] text-sm">✖</span>
              )}
              {t.type === "info" && (
                <span className="text-[#4fc1ff] text-sm">ℹ</span>
              )}
            </div>

            {/* MESSAGE */}
            <div className="flex-1 text-[12.5px] text-[#cccccc] leading-snug">
              {t.message}
            </div>

            {/* CLOSE */}
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#8b8b8b] hover:text-white text-xs mt-[2px]"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
