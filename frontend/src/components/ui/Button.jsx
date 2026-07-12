export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2
        rounded-lg
        font-medium
        transition
        bg-black
        text-white
        hover:opacity-90
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
