import React from "react";

interface Props {
  score: number;
  size?: number;
}

export const TrustScoreGauge: React.FC<Props> = ({ score, size = 120 }) => {
  const percentage = Math.round(score * 100);
  const color = score >= 0.8 ? "#4CAF50" : score >= 0.6 ? "#FFC107" : "#F44336";

  return (
    <div className="trust-score-gauge" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <circle
          className="gauge-background"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#eee"
          strokeWidth="10"
        />
        <circle
          className="gauge-progress"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${percentage * 2.83} 283`}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fill={color}
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};
