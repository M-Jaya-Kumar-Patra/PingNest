export default function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  meta,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-5

        lg:flex-row
        lg:items-start
        lg:justify-between

        ${className}
      `}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p
            className="
            text-sm
            font-medium

            uppercase
            tracking-wider

            text-orange-400
            "
          >
            {eyebrow}
          </p>
        ) : null}

        <h1
          className="
          mt-2

          text-3xl
          md:text-4xl

          font-bold

          text-white
          "
        >
          {title}
        </h1>

        {description ? (
          <p
            className="
            mt-3

            max-w-3xl

            text-sm
            md:text-base

            leading-6

            text-slate-400
            "
          >
            {description}
          </p>
        ) : null}

        {meta ? (
          <div className="mt-4">
            {meta}
          </div>
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
  );
}