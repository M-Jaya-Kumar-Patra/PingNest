"use client";

export default function SessionExpiredModal({ open, onLogin }) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
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
        p-6
        rounded-lg
        w-full
        max-w-md
        "
      >
        <h2
          className="
          text-xl
          font-semibold
          mb-2
          "
        >
          Session Expired
        </h2>

        <p className="text-gray-500">
          Session expired. Please login again.
        </p>

        <button
          onClick={onLogin}
          className="
          mt-4
          w-full
          bg-black
          text-white
          py-2
          rounded
          "
        >
          Login Again
        </button>
      </div>
    </div>
  );
}
