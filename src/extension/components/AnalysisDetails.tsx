import React from "react";
import { ArticleAnalysis } from "@/types/extension";
import { FactCheck } from "@/core/api/factcheck";
import { TrustScoreGauge } from "./TrustScoreGauge";
import { FactCheckList } from "./FactCheckList";
import { WarningsList } from "./WarningsList";
import { Loader2 } from "lucide-react";

interface Props {
  isLoading: boolean;
  error?: string;
  analysis?: ArticleAnalysis & { factChecks: FactCheck[] };
}

export const AnalysisDetails: React.FC<Props> = ({
  isLoading,
  error,
  analysis,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="mt-2 text-gray-600">Analyzing content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-4 text-center text-gray-600">
        No analysis available for this page
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-center">
        <TrustScoreGauge score={analysis.trustScore.score} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Fact Checks</h2>
        <FactCheckList factChecks={analysis.factChecks} />
      </div>

      <WarningsList warnings={analysis.warnings} />

      <div className="text-xs text-gray-500 text-center">
        Last updated: {new Date(analysis.trustScore.timestamp).toLocaleString()}
      </div>
    </div>
  );
};
