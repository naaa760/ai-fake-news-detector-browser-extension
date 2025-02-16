import React, { useEffect, useState } from "react";
import { ArticleAnalysis } from "../types/extension";

export function Popup() {
  const [analysis, setAnalysis] = useState<ArticleAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      chrome.runtime.sendMessage(
        { type: "GET_ANALYSIS", tabId: currentTab.id },
        (response: ArticleAnalysis) => {
          setAnalysis(response);
          setLoading(false);
        }
      );
    });
  }, []);

  if (loading) {
    return <div className="loading">Analyzing...</div>;
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
