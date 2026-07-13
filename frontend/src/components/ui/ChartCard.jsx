import EmptyState from "./EmptyState";
import Card from "./Card";

export default function ChartCard({
  title,
  description,
  actions,
  children,
  empty = false,
  emptyTitle = "No data yet",
  emptyMessage =
    "Data will appear here as requests arrive.",
  className = "",
  contentClassName = "",
}) {
  return (
    <Card
      className={`
        flex
        min-h-[360px]
        flex-col
        p-0

        overflow-hidden

        ${className}
      `}
    >
      <div
        className="
        border-b
        border-slate-800

        px-5
        py-4
        "
      >
        <div
          className="
          flex
          flex-col
          gap-3

          sm:flex-row
          sm:items-start
          sm:justify-between
          "
        >
          <div>
            <h3
              className="
              text-base
              font-semibold
              text-white
              "
            >
              {title}
            </h3>

            {description ? (
              <p
                className="
                mt-1
                text-sm
                leading-5
                text-slate-400
                "
              >
                {description}
              </p>
            ) : null}
          </div>

          {actions ? (
            <div
              className="
              flex
              shrink-0
              flex-wrap
              gap-2
              "
            >
              {actions}
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={`
          flex
          flex-1
          flex-col

          p-5

          ${contentClassName}
        `}
      >
        {empty ? (
          <EmptyState
            title={emptyTitle}
            message={emptyMessage}
            className="flex-1"
          />
        ) : (
          children
        )}
      </div>
    </Card>
  );
}