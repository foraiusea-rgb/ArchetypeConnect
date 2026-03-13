"use client";

import { useEffect, useState, createContext, useContext, useCallback, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  toast: (text: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((text: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, text, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm" role="status" aria-live="polite">
        {toasts.map((t) => (
          <ToastItem key={t.id} message={t} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ message, onDismiss }: { message: ToastMessage; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const styles = {
    success: { bg: "bg-emerald-600 dark:bg-emerald-700", icon: <CheckCircle size={18} /> },
    error: { bg: "bg-red-600 dark:bg-red-700", icon: <AlertCircle size={18} /> },
    info: { bg: "bg-indigo-600 dark:bg-indigo-700", icon: <Info size={18} /> },
  };

  const style = styles[message.type];

  return (
    <div
      className={`${style.bg} text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-slide-up flex items-center gap-3`}
    >
      <span className="shrink-0 opacity-90">{style.icon}</span>
      <span className="flex-1">{message.text}</span>
      <button
        onClick={onDismiss}
        className="text-white/70 hover:text-white shrink-0 transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
