export interface ExtensionMessage {
  message: string;
  data?: unknown;
}

export interface TrustScore {
  score: number;
  confidence: number;
  timestamp: number;
}

export interface FactCheck {
  source: string;
  verdict: string;
  url: string;
}

export interface ArticleAnalysis {
  trustScore: TrustScore;
  factChecks: FactCheck[];
  warnings: string[];
}
