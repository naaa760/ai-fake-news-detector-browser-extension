import React from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  warnings: string[];
}

export const WarningsList: React.FC<Props> = ({ warnings }) => {
  if (!warnings.length) return null;

  return (
    <div className="space-y-2 mt-4">
      {warnings.map((warning, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md"
        >
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">{warning}</span>
        </div>
      ))}
    </div>
  );
};
