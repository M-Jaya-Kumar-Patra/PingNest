export default function HealthScoreCard({ score }) {
  const getStatus = () => {
    if (score >= 90) return "Excellent";

    if (score >= 70) return "Good";

    if (score >= 50) return "Warning";

    return "Critical";
  };

  return (
    <div
      className="
      bg-white
      border
      rounded-xl
      p-6
      shadow
    "
    >
      <h2
        className="
        text-xl
        font-semibold
        mb-4
      "
      >
        Health Score
      </h2>

      <div
        className="
        text-5xl
        font-bold
      "
      >
        {score}
      </div>

      <p
        className="
        text-gray-500
        mt-2
      "
      >
        {getStatus()}
      </p>
    </div>
  );
}
