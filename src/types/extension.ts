export interface ArticleAnalysis {
  trustScore: {
    score: number;
    confidence: number;
    timestamp: number;
  };
  factChecks: FactCheck[];
  warnings: string[];
}

export interface FactCheck {
  source: string;
  claim: string;
  rating: string;
  explanation: string;
  verdict: string;
  url: string;
}
