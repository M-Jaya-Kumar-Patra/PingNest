import { forwardRef } from "react";

const Input = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        ref={ref}
        className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
        {...props}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
