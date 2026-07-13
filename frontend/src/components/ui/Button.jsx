export default function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center

        px-4
        py-2.5

        rounded-xl

        font-medium

        bg-orange-500
        text-white

        transition-all
        duration-200

        hover:bg-orange-400
        hover:shadow-lg
        hover:shadow-orange-500/20

        active:scale-[0.98]

        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-orange-500
        disabled:hover:shadow-none

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
} 