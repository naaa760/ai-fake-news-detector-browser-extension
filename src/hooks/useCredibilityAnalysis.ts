import { useState, useEffect } from "react";
import { AnalysisResult } from "@/types/ai";
import { ContentScanner } from "@/core/content/scanner";

export function useCredibilityAnalysis() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL("@/core/ai/worker.ts", import.meta.url));
    const scanner = new ContentScanner();

    worker.onmessage = (event) => {
      if ("error" in event.data) {
        setError(event.data.error);
        setIsLoading(false);
        return;
      }
      setAnalysis(event.data);
      setIsLoading(false);
    };

    scanner.startScanning((content) => {
      worker.postMessage(content);
    });

    return () => {
      scanner.stopScanning();
      worker.terminate();
    };
  }, []);

  return { analysis, isLoading, error };
}
