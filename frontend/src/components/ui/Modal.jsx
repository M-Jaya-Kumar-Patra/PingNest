"use client";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >
      <div
        className="
        bg-white
        rounded-xl
        p-6
        w-full
        max-w-md
      "
      >
        {children}

        <button
          onClick={onClose}
          className="
            mt-4
            text-sm
            text-gray-500
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
