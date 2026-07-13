"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  error,
  disabled = false,
  registration,
  placeholder = "",
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label
          className="
          block
          text-sm
          font-medium
          text-white
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={
            showPassword ? "text" : "password"
          }
          disabled={disabled}
          placeholder={placeholder}
          className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          pr-12
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200

          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-500/20

          hover:border-orange-500/30

          disabled:cursor-not-allowed
          disabled:opacity-60
          "
          {...registration}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2

          text-slate-400
          hover:text-orange-400

          transition-colors
          duration-200
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p
          className="
          text-sm
          text-red-400
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}