export default function LoadingSkeleton({
  rows = 1,
  className = "",
  itemClassName = "h-4",
}) {
  return (
    <div
      className={`
        animate-pulse
        space-y-3

        ${className}
      `}
    >
      {Array.from({
        length: rows,
      }).map((_, index) => (
        <div
          key={index}
          className={`
            rounded-lg

            bg-slate-800

            ${itemClassName}
          `}
        />
      ))}
    </div>
  );
}