export interface ExtensionMessage {
  message: string;
  data?: any;
}

export interface TrustScore {
  score: number;
  confidence: number;
  source: string;
  timestamp: number;
}

export interface ArticleAnalysis {
  trustScore: TrustScore;
  factChecks: {
    source: string;
    verdict: string;
    url: string;
  }[];
  warnings: string[];
}
