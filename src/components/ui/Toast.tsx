"use client";

import { CheckCircle, Info, XCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";

type ToastProps = {
  type: ToastType;
  message: string;
  onClose: () => void;
};

const toastConfig = {
  success: {
    icon: CheckCircle,
    className: "border-green-500/30 bg-green-500/10 text-green-300",
  },
  error: {
    icon: XCircle,
    className: "border-red-500/30 bg-red-500/10 text-red-300",
  },
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  },
};

export default function Toast({ type, message, onClose }: ToastProps) {
  const Icon = toastConfig[type].icon;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur ${toastConfig[type].className}`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />

      <p className="text-sm font-medium">{message}</p>

      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-sm opacity-70 transition hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}