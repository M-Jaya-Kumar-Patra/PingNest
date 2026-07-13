export default function Loader({ text = "Loading..." }) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center

      py-16
      "
    >
      <div
        className="
        h-10
        w-10

        animate-spin

        rounded-full

        border-4
        border-slate-800
        border-t-orange-500
        "
      />

      <p
        className="
        mt-4

        text-sm
        text-slate-400
        "
      >
        {text}
      </p>
    </div>
  );
}
