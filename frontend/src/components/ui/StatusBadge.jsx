const toneStyles = {
  active:
    "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",

  success:
    "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",

  good:
    "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",

  warning:
    "bg-amber-500/10 text-amber-400 ring-amber-500/20",

  pending:
    "bg-amber-500/10 text-amber-400 ring-amber-500/20",

  danger:
    "bg-red-500/10 text-red-400 ring-red-500/20",

  critical:
    "bg-red-500/10 text-red-400 ring-red-500/20",

  error:
    "bg-red-500/10 text-red-400 ring-red-500/20",

  info:
    "bg-orange-500/10 text-orange-400 ring-orange-500/20",

  neutral:
    "bg-slate-800 text-slate-300 ring-slate-700",

  inactive:
    "bg-slate-800 text-slate-300 ring-slate-700",
};

const dotStyles = {
  active: "bg-emerald-400",
  success: "bg-emerald-400",
  good: "bg-emerald-400",

  warning: "bg-amber-400",
  pending: "bg-amber-400",

  danger: "bg-red-400",
  critical: "bg-red-400",
  error: "bg-red-400",

  info: "bg-orange-400",

  neutral: "bg-slate-400",
  inactive: "bg-slate-400",
};

const labelize = (value) =>
  String(value || "neutral")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

export default function StatusBadge({
  status = "neutral",
  children,
  showDot = true,
  className = "",
}) {
  const normalizedStatus = String(
    status || "neutral"
  ).toLowerCase();

  const tone =
    toneStyles[normalizedStatus] ||
    toneStyles.neutral;

  const dot =
    dotStyles[normalizedStatus] ||
    dotStyles.neutral;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2

        rounded-full

        px-3
        py-1

        text-xs
        font-medium

        ring-1
        ring-inset

        transition-colors

        ${tone}
        ${className}
      `}
    >
      {showDot && (
        <span
          className={`
            h-2
            w-2
            rounded-full

            ${dot}
          `}
        />
      )}

      <span className="truncate">
        {children ||
          labelize(status)}
      </span>
    </span>
  );
}