import React from "react";
import { FactCheck } from "@/core/api/factcheck";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Props {
  factChecks: FactCheck[];
}

export const FactCheckList: React.FC<Props> = ({ factChecks }) => {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case "true":
        return <CheckCircle className="text-green-500" />;
      case "false":
        return <AlertTriangle className="text-red-500" />;
      default:
        return <Info className="text-yellow-500" />;
    }
  };

  if (!factChecks.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No fact checks available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {factChecks.map((check, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            {getVerdictIcon(check.verdict)}
            <div className="flex-1">
              <h3 className="font-medium">{check.claim}</h3>
              <p className="text-sm text-gray-600 mt-1">{check.explanation}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span>{check.source}</span>
                {check.url && (
                  <a
                    href={check.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read More
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
