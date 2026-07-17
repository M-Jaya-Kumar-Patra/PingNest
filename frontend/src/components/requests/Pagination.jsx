"use client";

export default function Pagination({
  page,
  pages,
  setPage,
}) {
  if (pages <= 1) {
    return null;
  }

  return (
    <div
      className="
      flex
      justify-center
      gap-2
      mt-6
      "
    >
      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="
        px-4
        py-2

        rounded-lg

        bg-slate-900
        border
        border-slate-800
        "
      >
        Previous
      </button>

      <span
        className="
        px-4
        py-2

        text-slate-400
        "
      >
        {page} / {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() =>
          setPage(page + 1)
        }
        className="
        px-4
        py-2

        rounded-lg

        bg-slate-900
        border
        border-slate-800
        "
      >
        Next
      </button>
    </div>
  );
}