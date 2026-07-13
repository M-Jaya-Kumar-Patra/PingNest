import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
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

        <input
          ref={ref}
          className={`
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-3
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

            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;