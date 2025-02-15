import { AnalysisResult } from "@/types/ai";

interface AnalysisDetailsProps {
  analysis: AnalysisResult;
}

export function AnalysisDetails({ analysis }: AnalysisDetailsProps) {
  return (
    <div className="space-y-4">
      {analysis.warnings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-700">Warnings</h2>
          <ul className="space-y-1">
            {analysis.warnings.map((warning, index) => (
              <li
                key={index}
                className="text-sm text-red-600 bg-red-50 p-2 rounded"
              >
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-sm text-gray-500">
        Confidence: {Math.round(analysis.confidence * 100)}%
      </div>

      {(analysis.sources?.snopes || analysis.sources?.reuters) && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-700">Fact Checks</h2>
          <div className="space-y-1 text-sm">
            {analysis.sources.snopes && (
              <a
                href={analysis.sources.snopes}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block"
              >
                View on Snopes
              </a>
            )}
            {analysis.sources.reuters && (
              <a
                href={analysis.sources.reuters}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block"
              >
                View on Reuters
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
