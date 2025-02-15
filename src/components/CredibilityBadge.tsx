interface CredibilityBadgeProps {
  score: number;
}

export function CredibilityBadge({ score }: CredibilityBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className={`rounded-lg p-4 ${getColor(score)}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Credibility Score</span>
        <span className="text-2xl font-bold">{Math.round(score)}%</span>
      </div>
    </div>
  );
}
