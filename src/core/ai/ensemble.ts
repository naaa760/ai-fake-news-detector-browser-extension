import { TransformersClient } from "./transformers-client";
import { ArticleContent, AnalysisResult } from "@/types/ai";

export class CredibilityAnalyzer {
  private transformersClient: TransformersClient;

  constructor() {
    this.transformersClient = TransformersClient.getInstance();
  }

  public async analyze(content: ArticleContent): Promise<AnalysisResult> {
    await this.transformersClient.initialize();

    const { score, confidence } = await this.transformersClient.analyze(
      `${content.title}\n${content.text}`
    );

    const warnings = this.generateWarnings(score, content);

    return {
      credibilityScore: score * 100, // Convert to percentage
      confidence,
      warnings,
      sources: await this.fetchExternalSources(content),
    };
  }

  private generateWarnings(score: number, _content: ArticleContent): string[] {
    const warnings: string[] = [];

    if (score < 0.5) {
      warnings.push("This article shows signs of potential misinformation");
    }
    if (score < 0.3) {
      warnings.push("Multiple credibility issues detected");
    }

    return warnings;
  }

  private async fetchExternalSources(
    _content: ArticleContent
  ): Promise<AnalysisResult["sources"]> {
    // This would be implemented to fetch from Snopes/Reuters APIs
    // For now returning placeholder
    return {
      snopes: undefined,
      reuters: undefined,
    };
  }
}
