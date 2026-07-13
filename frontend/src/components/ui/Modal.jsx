"use client";

import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0

      z-50

      flex
      items-center
      justify-center

      bg-black/70
      backdrop-blur-sm

      p-4
      "
    >
      <div
        className="
        relative

        w-full
        max-w-lg

        rounded-3xl

        border
        border-slate-800

        bg-gradient-to-b
        from-slate-900
        to-slate-950

        shadow-2xl
        shadow-black/40

        p-6
        "
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="
          absolute
          top-4
          right-4

          rounded-lg

          p-2

          text-slate-400

          transition-colors

          hover:bg-slate-800
          hover:text-orange-400
          "
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
}