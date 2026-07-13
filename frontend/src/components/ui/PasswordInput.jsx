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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        className="
        block
        text-sm
        font-medium
        mb-2
        "
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          placeholder={placeholder}
          className="
          w-full
          border
          rounded-lg
          p-3
          pr-12
          outline-none
          focus:ring-2
          focus:ring-black
          disabled:bg-gray-100
          "
          {...registration}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-500
          "
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p
          className="
          text-sm
          text-red-500
          mt-1
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}
