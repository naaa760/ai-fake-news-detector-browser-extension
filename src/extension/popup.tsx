import React, { useEffect, useState } from "react";
import { ArticleAnalysis } from "../types/extension";

export function Popup() {
  const [analysis, setAnalysis] = useState<ArticleAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnalysis = async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tab?.id) {
          setError("No active tab");
          setLoading(false);
          return;
        }

        // Get analysis
        chrome.tabs.sendMessage(
          tab.id,
          { type: "GET_ANALYSIS" },
          (response) => {
            if (chrome.runtime.lastError) {
              setError("Content script not ready. Please refresh the page.");
              setLoading(false);
              return;
            }

            if (response?.success && response.data) {
              setAnalysis(response.data);
              setLoading(false);
            } else {
              setError(response?.error || "Analysis not ready. Please wait.");
              setLoading(false);
            }
          }
        );
      } catch {
        setError("Failed to communicate with content script");
        setLoading(false);
      }
    };

    getAnalysis();
  }, []);

  if (loading) {
    return <div className="loading">Analyzing page...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!analysis) {
    return <div className="error">Unable to analyze this page</div>;
  }

  return (
    <div className="popup">
      <header>
        <h1>TruthGuard AI</h1>
        <div className="score">
          Credibility Score: {Math.round(analysis.trustScore.score * 100)}%
        </div>
      </header>

      <main>
        <section className="fact-checks">
          <h2>Fact Checks</h2>
          {analysis.factChecks.map((check, index) => (
            <div key={index} className="fact-check">
              <div className="source">{check.source}</div>
              <div className="verdict">{check.verdict}</div>
              {check.url && (
                <a href={check.url} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              )}
            </div>
          ))}
        </section>

        {analysis.warnings.length > 0 && (
          <section className="warnings">
            <h2>Warnings</h2>
            <ul>
              {analysis.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
