export default function EmptyState({
  title = "No data yet",
  message,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center

        py-12
        text-center

        ${className}
      `}
    >
      <div
        className="
  mb-4

  h-14
  w-14

  rounded-2xl

  border
  border-orange-500/20

  bg-orange-500/10

  flex
  items-center
  justify-center
  "
      >
        🚀
      </div>

      <h3
        className="
        text-lg
        font-semibold
        text-white
        "
      >
        {title}
      </h3>

      <p
        className="
        mt-2

        max-w-md

        text-sm
        text-slate-400
        "
      >
        {message}
      </p>
    </div>
  );
}
