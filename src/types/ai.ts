export interface AnalysisResult {
  credibilityScore: number;
  confidence: number;
  warnings: string[];
  sources?: {
    snopes?: string;
    reuters?: string;
  };
}

export interface ModelOutput {
  score: number;
  confidence: number;
}

export interface ArticleContent {
  title: string;
  text: string;
  url: string;
  timestamp: number;
}
