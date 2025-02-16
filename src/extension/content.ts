import { FakeNewsDetector } from "../core/ai/model";
import { ArticleAnalysis } from "@/types/extension";

class ContentAnalyzer {
  private detector: FakeNewsDetector;
  private analyzing = false;

  constructor() {
    this.detector = new FakeNewsDetector();
    this.initialize();
  }

  private async initialize() {
    await this.detector.initialize();
    this.setupMessageListener();
    this.analyzeCurrentPage();
  }

  private setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
      if (request.type === "GET_ANALYSIS") {
        this.analyzeCurrentPage().then(sendResponse);
        return true; // Keep channel open for async response
      }
    });
  }

  private async analyzeCurrentPage(): Promise<ArticleAnalysis | null> {
    if (this.analyzing) return null;
    this.analyzing = true;

    try {
      const content = this.getPageContent();
      const analysis = await this.detector.analyzeContent(content);
      this.updateUI(analysis);
      return analysis;
    } catch (error) {
      console.error("Analysis failed:", error);
      return null;
    } finally {
      this.analyzing = false;
    }
  }

  private getPageContent(): string {
    const article = document.querySelector("article");
    if (article) return article.textContent || "";

    const mainContent = document.querySelector("main");
    if (mainContent) return mainContent.textContent || "";

    return document.body.textContent || "";
  }

  private updateUI(analysis: ArticleAnalysis) {
    const badge = this.createOrUpdateBadge();
    badge.style.backgroundColor = this.getScoreColor(analysis.trustScore.score);
    badge.textContent = `${Math.round(analysis.trustScore.score * 100)}%`;
  }

  private createOrUpdateBadge(): HTMLElement {
    let badge = document.getElementById("truthguard-badge");
    if (!badge) {
      badge = document.createElement("div");
      badge.id = "truthguard-badge";
      badge.className =
        "fixed bottom-4 right-4 p-2 rounded-full text-white font-bold";
      document.body.appendChild(badge);
    }
    return badge;
  }

  private getScoreColor(score: number): string {
    if (score >= 0.8) return "#4CAF50";
    if (score >= 0.6) return "#FFC107";
    return "#F44336";
  }
}

// Initialize the analyzer
new ContentAnalyzer();
