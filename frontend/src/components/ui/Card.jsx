export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl

        border
        border-slate-800

        bg-gradient-to-b
        from-slate-900
        to-slate-950

        p-5
        md:p-6

        shadow-lg
        shadow-black/20

        transition-all
        duration-300

        hover:border-orange-500/20

        ${className}
      `}
    >
      {children}
    </div>
  );
}