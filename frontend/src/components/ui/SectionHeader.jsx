export default function SectionHeader({
  title,
  description,
  actions,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-3
        sm:flex-row
        sm:items-end
        sm:justify-between
        ${className}
      `}
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-950">{title}</h2>

        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
