import { CredibilityBadge } from "@/components/CredibilityBadge";
import { AnalysisDetails } from "@/components/AnalysisDetails";
import { useCredibilityAnalysis } from "@/hooks/useCredibilityAnalysis";

export default function PopupPage() {
  const { analysis, isLoading, error } = useCredibilityAnalysis();

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">Analyzing article...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {analysis && (
        <>
          <CredibilityBadge score={analysis.credibilityScore} />
          <AnalysisDetails analysis={analysis} />
        </>
      )}
    </div>
  );
}
