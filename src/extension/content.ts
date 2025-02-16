import { FakeNewsDetector } from "../core/ai/model";
import { ArticleAnalysis } from "@/types/extension";

class ContentAnalyzer {
  private detector: FakeNewsDetector;
  private analyzing = false;
  private badge: HTMLElement | null = null;

  constructor() {
    this.detector = new FakeNewsDetector();
    this.initialize();
  }

  private async initialize() {
    this.createLoadingBadge();
    await this.detector.initialize();
    this.setupMessageListener();
    await this.analyzeCurrentPage();
  }

  private createLoadingBadge() {
    this.badge = document.createElement("div");
    this.badge.id = "truthguard-badge";
    this.badge.className = "truthguard-badge";
    this.badge.textContent = "Analyzing...";
    document.body.appendChild(this.badge);
  }

  private setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
      if (request.type === "GET_ANALYSIS") {
        this.analyzeCurrentPage().then(sendResponse);
        return true;
      }
    });
  }

  private async analyzeCurrentPage(): Promise<ArticleAnalysis | null> {
    if (this.analyzing) return null;
    this.analyzing = true;
    this.updateBadgeState("analyzing");

    try {
      const content = this.getPageContent();
      const analysis = await this.detector.analyzeContent(content);
      this.updateUI(analysis);
      return analysis;
    } catch (error) {
      console.error("Analysis failed:", error);
      this.updateBadgeState("error");
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

  private updateBadgeState(state: "analyzing" | "error" | "ready") {
    if (!this.badge) return;

    switch (state) {
      case "analyzing":
        this.badge.textContent = "Analyzing...";
        this.badge.style.backgroundColor = "#FFC107";
        break;
      case "error":
        this.badge.textContent = "Error";
        this.badge.style.backgroundColor = "#F44336";
        break;
      case "ready":
        // Will be updated with actual score
        break;
    }
  }

  private updateUI(analysis: ArticleAnalysis) {
    if (!this.badge) return;

    const score = Math.round(analysis.trustScore.score * 100);
    this.badge.style.backgroundColor = this.getScoreColor(
      analysis.trustScore.score
    );
    this.badge.textContent = `${score}%`;
  }

  private getScoreColor(score: number): string {
    if (score >= 0.8) return "#4CAF50";
    if (score >= 0.6) return "#FFC107";
    return "#F44336";
  }
}

// Initialize the analyzer
new ContentAnalyzer();
