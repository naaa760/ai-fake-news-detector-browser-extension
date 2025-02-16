import React, { useEffect, useState } from "react";
import { AnalysisDetails } from "../components/AnalysisDetails";
import { ArticleAnalysis } from "@/types/extension";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Popup: React.FC = () => {
  const [analysis, setAnalysis] = useState<ArticleAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentTabAnalysis();
  }, []);

  const getCurrentTabAnalysis = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab.id) return;

      const response = await chrome.tabs.sendMessage(tab.id, {
        type: "GET_ANALYSIS",
      });
      setAnalysis(response);
    } catch (error) {
      console.error(error);
      setError("Failed to get analysis");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="w-96 p-4">
        <h1 className="text-xl font-bold mb-4">TruthGuard AI</h1>
        <AnalysisDetails
          isLoading={isLoading}
          error={error || undefined}
          analysis={analysis || undefined}
        />
      </div>
    </ErrorBoundary>
  );
};
